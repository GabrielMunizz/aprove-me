export type Assignors = {
  document: string;
  email: string;
  id: string;
  isDeleted: boolean;
  name: string;
  phone: string;
};

const formatAssignors = (assignors: Omit<Assignors, 'isDeleted'>[]) => {
  return assignors.reduce<string[]>((acc, assignor) => {
    if (assignor.name) {
      acc.push(assignor.name);
    }
    return acc;
  }, []);
};

export default formatAssignors;
