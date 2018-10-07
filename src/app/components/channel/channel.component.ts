import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable, combineLatest } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { IChannel } from '../home/home.component';
import { AngularFireAuth } from '@angular/fire/auth';

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

  public messageText: string = '';

  constructor(private $db: AngularFirestore, private $auth: AngularFireAuth) { }

  public ngOnInit() {
    if (!this.id) {
      return;
    }

    // this.messages = this.$db.collection('channels')
    //   .doc(this.id)
    //   .collection<IMessage>('messages')
    //   .valueChanges()
    //   .pipe(
    //     map((messages) => {
    //       // Post a SO question about how to do this good
    //       return messages.map((message) => {
    //         // return this.$db.doc(message.said_by.path).valueChanges();
    //         message.said_by.get().then((user) => {
    //           (message as any).user = user.data();
    //         });
    //         return message;
    //       });
    //     })
    //   )
    // ;
  }

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
    });

    this.messages = this.channelRef
      .collection<IMessage>('messages')
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
    if (event.key === 'Enter') {
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

}
