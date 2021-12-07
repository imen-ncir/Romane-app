import {AudioService} from './AudioService';
import {TokenService} from './TokenService';

export * from './ToastService';
export * from './ImageService';
export * from './UploadService';
export * from './AudioService';
export * from './ConfirmService';

const tokenService = new TokenService();
const audioService = new AudioService();

export {tokenService, audioService};
