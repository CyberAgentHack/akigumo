/**
 * book APIを叩くためのモジュール
 */
import axios from 'axios';

const getBookById = (id) => {
  const uri = `https://wfc2-image-api-259809.appspot.com/api/books/${id}`;
  const result = axios.get(uri);
  return result;
};

export default {
  getBookById,
};
