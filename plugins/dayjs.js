import dayjs, { formatDate } from 'dayjs';
import Vue from 'vue';

Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
