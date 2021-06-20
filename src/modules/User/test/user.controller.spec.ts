import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UsersController', () => {
  let userController: UserController;
  const mockUserService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();
    userController = module.get(UserController);
  });

  it('find all users', () => {
    expect(userController.find({}));
  });
  it('create new user', () => {
    expect(
      userController.create({
        email: 'ljw5152@hotmail.com',
        password: 'abc123..',
        confirmPassword: 'abc123..',
      }),
    );
  });
});
