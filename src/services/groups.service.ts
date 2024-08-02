import { PrismaClient, Group } from '@prisma/client';
import { CreateGroupDto } from '@dtos/group.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class GroupService {
  public group = new PrismaClient().group;

  public async findAllGroup(): Promise<Group[]> {
    const allGroup: Group[] = await this.group.findMany();
    return allGroup;
  }

  public async findGroupById(groupId: number): Promise<Group> {
    if (isEmpty(groupId)) throw new HttpException(400, "groupId is empty");

    const findGroup = await this.group.findUnique({ where: { id: groupId }});
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    return findGroup;
  }

  public async createGroup(GroupData: CreateGroupDto): Promise<Group> {
    if (isEmpty(GroupData)) throw new HttpException(400, "GroupData is empty");

    const createGroupData: Group = await this.group.create({ data: { ...GroupData, }});
    return createGroupData;
  }

  public async updateGroup(groupId: number, GroupData: CreateGroupDto): Promise<Group> {
    if (isEmpty(GroupData)) throw new HttpException(400, "GroupData is empty");

    const findGroup = await this.group.findUnique({ where: { id: groupId } });
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    const updateGroupData = await this.group.update({ where: { id: groupId }, data: { ...GroupData, }});
    return updateGroupData;
  }

  public async deleteGroup(groupId: number): Promise<Group> {
    if (isEmpty(groupId)) throw new HttpException(400, "Group doesn't existId");

    const findGroup: Group = await this.group.findUnique({ where: { id: groupId } });
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    const deleteGroupData = await this.group.delete({ where: { id: groupId } });
    return deleteGroupData;
  }

  public async joinGroup(userId: number, groupId: number) {
    if (isEmpty(groupId) || isEmpty(userId)) throw new HttpException(400, "Group doesn't existId");

    const joinGroupData = await this.group.update({
      where: { id: groupId },
      data: {
        users: {
          create: [
            {
              user_id: userId
            }
          ]
        }
      },
      select: {
        users: true
      }
    });

    return joinGroupData;
  }

  public async leaveGroup(userId: number, groupId: number) {
    if (isEmpty(groupId) || isEmpty(userId)) throw new HttpException(400, "Group doesn't existId");

    const leaveGroupData = await this.group.update({
      where: { id: groupId },
      data: {
        users: {
          delete: {
            user_id_group_id: {
              group_id: groupId,
              user_id: userId
            }
          }
        }
      },
      select: {
        users: true
      }
    })

    return leaveGroupData;
  }
}

export default GroupService;
