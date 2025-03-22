export type Assignors = {
  document: string;
  email: string;
  id: string;
  isDeleted: boolean;
  name: string;
  phone: string;
};

type FormatedAssignor = {
  value: string;
  label: string;
};

const formatAssignors = (assignors: Omit<Assignors, 'isDeleted'>[]) => {
  return assignors.reduce<FormatedAssignor[]>((acc, assignor) => {
    if (assignor.name) {
      acc.push({ value: assignor.id, label: assignor.name });
    }
    return acc;
  }, []);
};

export default formatAssignors;
