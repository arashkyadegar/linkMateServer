import { DepartmentsController } from './departments.controller';
import { CreateDepartmentDto } from './create-department.dto';

describe('DepartmentsController', () => {
  let controller: DepartmentsController;

  beforeEach(async () => {
    controller = new DepartmentsController();
  });

  describe('findAll', () => {
    it('should return array of departments', async () => {
      const result = [];
      expect(controller.findAll()).toEqual(result);
    });
  });

  describe('createOne', () => {
    it('should return sent dto', async () => {
      let dt = new CreateDepartmentDto();
      dt.name = 'mngmnt department';
      expect(controller.createOne(dt)).toHaveProperty('name');
    });
  });
});
