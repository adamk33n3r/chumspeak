/* SystemJS module definition */
declare var nodeModule: NodeModule;
interface NodeModule {
  id: string;
}
import { IInterop } from '../preload';
declare global {

  interface Window {
    process: any;
    require: any;
    interop: IInterop;
  }

}
