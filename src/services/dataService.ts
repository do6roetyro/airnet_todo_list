const fetchUserData = async () => {
  const response = await fetch("/data.json");
  if (!response.ok) {
    throw new Error("Ошибка загрузки данных пользователей");
  }
  return await response.json();
};

export default fetchUserData;
