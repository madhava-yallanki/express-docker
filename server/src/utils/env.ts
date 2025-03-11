export class Env {
  static readonly lkUrl = process.env['LIVEKIT_URL'] || '';
  static readonly lkAPIKey = process.env['LIVEKIT_API_KEY'] || '';
  static readonly lkSecret = process.env['LIVEKIT_API_SECRET'] || '';
  static readonly awsAccessKey = process.env['AWS_ACCESS_KEY_ID'] || '';
  static readonly awsSecretKey = process.env['AWS_SECRET_ACCESS_KEY'] || '';
}
