const formatDate = (dateString: Date) => {
  const date = new Date(dateString);

  const formattedDate = Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);

  const weekDayUpperCase =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return weekDayUpperCase;
};

export default formatDate;
