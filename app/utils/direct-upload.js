import { DirectUpload } from '@rails/activestorage';

export async function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const upload = new DirectUpload(file, '/rails/active_storage/direct_uploads');

    upload.create((error, blob) => {
      if (error) {
        reject(error);
      } else {
        resolve(blob.signed_id);
      }
    });
  });
}
