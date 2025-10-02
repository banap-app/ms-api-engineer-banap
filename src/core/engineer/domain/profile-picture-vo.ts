import { Either } from '../../shared/domain/either';
import { MediaFileValidator } from '../../shared/domain/validators/media-file-validator';
import { ImageMedia } from '../../shared/domain/value-objects/image-media-vo';

export class ProfilePicture extends ImageMedia {
  static maxSize = 1024 * 1024 * 10;
  static mimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  static createFromFile({
    raw_name,
    mime_type,
    size,
  }: {
    raw_name: string;
    mime_type: string;
    size: number;
  }) {
    const mediaFileValidator = new MediaFileValidator(
      ProfilePicture.maxSize,
      ProfilePicture.mimeTypes,
    );
    return Either.safe(() => {
      const { name: newName } = mediaFileValidator.validate({
        raw_name,
        mime_type,
        size,
      });

      return new ProfilePicture({
        name: newName,
        location: 'profilePictureEngineer',
      });
    });
  }
}
