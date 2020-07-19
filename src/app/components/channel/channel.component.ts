import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable, combineLatest } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';

import { IChannel } from '../home/home.component';
import { DeleteChannelComponent } from '../../dialogs/delete-channel/delete-channel.component';

interface IMessage {
  body: string;
  said_by: DocumentReference;
  timestamp: firestore.Timestamp;
}

interface IFetchedMessage {
  body: string;
  said_by: IUser | undefined;
  timestamp: Date;
}

interface IUser {
  displayName: string;
  username: string;
}

@Component({
  selector: 'chum-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnChanges {

  @Input()
  public id!: string;

  public channelRef!: AngularFirestoreDocument<IChannel>;

  public channel!: Observable<IChannel | undefined>;
  public messages!: Observable<IFetchedMessage[]>;

  private channelCached: IChannel | undefined;

  public messageText: string = '';

  constructor(private $db: AngularFirestore, private $auth: AngularFireAuth, private $dialog: MatDialog) { }

  public ngOnInit() { }

  public ngOnChanges(changes: SimpleChanges) {
    if (!changes.id || !changes.id.currentValue) {
      return;
    }

    console.log('ngOnChanges:', changes);

    this.channelRef = this.$db.collection('channels')
      .doc<IChannel>(changes.id.currentValue);

    this.channel = this.channelRef.valueChanges();
    this.channel.subscribe((channel) => {
      console.log('CHANNEL:', channel);
      if (channel) {
        channel.id = this.id;
      }
      this.channelCached = channel;
    });

    this.messages = this.channelRef
      .collection<IMessage>('messages', (query) => {
        return query.orderBy('timestamp');
      })
      .valueChanges()
      .pipe(
        map((messages) => {
          return messages.map((message) => {
            return this.$db.doc<IUser>(message.said_by.path).valueChanges()
              .pipe(
                map((user) => {
                  return { body: message.body, timestamp: message.timestamp.toDate(), said_by: user };
                })
              )
            ;
          });
        }),
        flatMap((mess) => combineLatest(mess))
      )
    ;

    this.messages.subscribe((messages) => {
      console.log('messages:', messages);
    });
  }

  public onInputKeydown(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      console.log('sending message:', this.messageText);
      this.channelRef.collection<IMessage>('messages').add(({
        body: this.messageText,
        said_by: this.$db.collection('users').doc(this.$auth.auth.currentUser!.uid).ref,
        // said_by: `users/${this.$auth.auth.currentUser!.uid}`,
        timestamp: new Date(),
      }) as any);
      this.messageText = '';
    }
  }

  public deleteChannel() {
    this.channel.subscribe((channel) => {
      console.log('deleting:', channel);
    });
    console.log(this.channelCached);
    const dialogRef = this.$dialog.open(DeleteChannelComponent, {
      // width: '500px',
      data: { channel: this.channelCached }
    });
    dialogRef.afterClosed().subscribe((data) => {
      console.log('closed:', data);
    });
  }

}
