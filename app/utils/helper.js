import moment from 'moment';
import _ from 'lodash';

const checkMoment = input => {
  if (_.isEmpty(input)) {
    return undefined;
  }
  if (moment.isMoment(input)) {
    return input;
  }
  return moment(input).clone();
};

const calculateTotalPage = (totalLength, pageLimit) => {
  if (!_.isNumber(totalLength)) {
    totalLength = _.parseInt(totalLength);
  }
  if (!_.isNumber(pageLimit)) {
    pageLimit = _.parseInt(pageLimit);
  }
  if (totalLength === 0 || pageLimit === 0) {
    return 0;
  }
  return _.parseInt(
    totalLength % pageLimit > 0
      ? totalLength / pageLimit + 1
      : totalLength / pageLimit,
  );
};
const calculatePageInfo = (currentPage, pageLimit, totalLength) => {
  if (!_.isNumber(currentPage)) {
    currentPage = _.parseInt(currentPage);
  }
  if (!_.isNumber(pageLimit)) {
    pageLimit = _.parseInt(pageLimit);
  }
  if (!_.isNumber(totalLength)) {
    totalLength = _.parseInt(totalLength);
  }
  if (currentPage === 0 && pageLimit === 0) {
    return `0-0 của ${totalLength}`;
  }
  const start = currentPage * pageLimit + 1;
  let end = start + pageLimit - 1;
  if (end > totalLength) {
    end = totalLength;
  }
  return `${start}-${end} của ${totalLength}`;
};
const momentRange = {
  'Hôm nay': [moment(), moment()],
  'Tuần hiện tại': [moment().startOf('week'), moment().endOf('week')],
  'Tháng hiện tại': [moment().startOf('month'), moment().endOf('month')],
  'Tuần trước': [
    moment()
      .add(-1, 'weeks')
      .startOf('week'),
    moment()
      .add(-1, 'weeks')
      .endOf('week'),
  ],
  'Tháng trước': [
    moment()
      .add(-1, 'months')
      .startOf('month'),
    moment()
      .add(-1, 'months')
      .endOf('month'),
  ],
};
export { calculatePageInfo, calculateTotalPage, checkMoment, momentRange };
