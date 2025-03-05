import { LoginResponseDto } from "./dto/login-response.dto";

export interface UserJwtResponse {
    user: LoginResponseDto;
    accessToken: string;
  }