export const UserRolesEnum = {
  ADMIN: 'admin',
  PROJECT_AMIN: 'project_admin',
  MEMBER: 'member',
} as const;

export const AvailableUserRole = Object.values(UserRolesEnum);

export const TaskStatusEnum = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
};

export const AvailableTaskStatuses = Object.values(TaskStatusEnum);