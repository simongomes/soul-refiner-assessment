import { NextFunction, Request, Response } from 'express';
import { Group } from '@prisma/client';
import { CreateGroupDto } from '@dtos/group.dto';
import groupService from '@services/groups.service';

class GroupController {
  public groupService = new groupService();

  public getGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllGroupsData: Group[] = await this.groupService.findAllGroup();

      res.status(200).json({ data: findAllGroupsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const groupId = Number(req.params.id);
      const findOneGroupData: Group = await this.groupService.findGroupById(groupId);

      res.status(200).json({ data: findOneGroupData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const groupData: CreateGroupDto = req.body;
      const createGroupData: Group = await this.groupService.createGroup(groupData);

      res.status(201).json({ data: createGroupData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const groupId = Number(req.params.id);
      const groupData: CreateGroupDto = req.body;
      const updateGroupData: Group = await this.groupService.updateGroup(groupId, groupData);

      res.status(200).json({ data: updateGroupData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const groupId = Number(req.params.id);
      const deleteGroupData: Group = await this.groupService.deleteGroup(groupId);

      res.status(200).json({ data: deleteGroupData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public joinGroup = async (req, res, next) => {
    const groupId = Number(req.params.id);
    const userId = req.body.userId;

    const users = await this.groupService.joinGroup(userId, groupId);

    res.status(200).json(users)
  }

  public leaveGroup = async (req, res, next) => {
    const groupId = Number(req.params.id);
    const userId = req.body.userId;

    const users = await this.groupService.leaveGroup(userId, groupId);

    res.status(200).json(users)
  }
}

export default GroupController;
