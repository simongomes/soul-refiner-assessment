import { Router } from 'express';
import GroupsController from '@controllers/groupe.controller';
import { CreateGroupDto } from '@dtos/group.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class GroupsRoute implements Routes {
  public path = '/groups';
  public router = Router();
  public groupsController = new GroupsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.groupsController.getGroups);
    this.router.get(`${this.path}/:id(\\d+)`, this.groupsController.getGroupById);
    this.router.post(`${this.path}`, validationMiddleware(CreateGroupDto, 'body'), this.groupsController.createGroup);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateGroupDto, 'body', true), this.groupsController.updateGroup);
    this.router.delete(`${this.path}/:id(\\d+)`, this.groupsController.deleteGroup);
    this.router.put(`${this.path}/join/:id(\\d+)`, this.groupsController.joinGroup);
    this.router.put(`${this.path}/leave/:id(\\d+)`, this.groupsController.leaveGroup);
  }
}

export default GroupsRoute;
