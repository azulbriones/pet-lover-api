import bcrypt from "bcrypt";

import GetUserDTO from "../../application/data/GetUserDTO";
import LoginDTO from "../../application/data/LoginDTO";
import RegisterUserDTO from "../../application/data/RegisterUserDTO";
import User from "../../domain/models/User";
import UserRepository from "../../domain/repositories/UserRepository";

class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(dto: RegisterUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByUsername(dto.username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser: User = {
      id: 0, // Se asigna un valor temporal para cumplir con el tipo User, pero se reemplazará en la inserción :D
      username: dto.username,
      mail: dto.mail,
      password: hashedPassword,
    };

    return this.userRepository.createUser(newUser);
  }

  async login(dto: LoginDTO): Promise<User> {
    const user = await this.userRepository.findByUsername(dto.username);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    return user;
  }

  async getUserById(dto: GetUserDTO): Promise<User> {
    const user = await this.userRepository.findById(dto.id);
    if (!user) {
      throw new Error("User not found error");
    }

    return user;
  }
}

export default AuthService;
