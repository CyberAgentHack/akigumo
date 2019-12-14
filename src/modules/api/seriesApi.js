/**
 * series APIを叩くためのモジュール
 */
import axios from 'axios';

/**
 * 全てのシリーズを取得
 * @returns Promise<Any> res
 */
const getAllSeries = () => {
  const uri = 'https://wfc2-image-api-259809.appspot.com/api/series';
  const result = axios.get(uri);
  return result;
};

const getSeriesById = (id) => {
  const uri = `https://wfc2-image-api-259809.appspot.com/api/series/${id}`;
  const result = axios.get(uri);
  return result;
};

export default {
  getAllSeries,
  getSeriesById,
};
