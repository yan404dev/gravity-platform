export class TokenPayloadEntity {
  type: 'access' | 'refresh';
  sub: number;
  email: string;
  currentProfileId: number;
}
