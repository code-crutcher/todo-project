export function formatDate(date){
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function daysLeft(date){
  const currentDate = new Date();
  const dueDate = new Date(date);
  const diffInMs = dueDate - currentDate;

  const diffInDays = Math.ceil(diffInMs/(1000 * 60 * 60 * 24));

  if(diffInDays >= 0){
    return `${diffInDays} days left`;
  }else{
    return 'Overdue'
  }
}