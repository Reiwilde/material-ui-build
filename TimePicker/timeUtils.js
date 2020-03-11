'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseInt = require('babel-runtime/core-js/number/parse-int');

var _parseInt2 = _interopRequireDefault(_parseInt);

exports.addHours = addHours;
exports.addMinutes = addMinutes;
exports.addSeconds = addSeconds;
exports.formatTime = formatTime;
exports.rad2deg = rad2deg;
exports.getTouchEventOffsetValues = getTouchEventOffsetValues;
exports.isInner = isInner;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addHours(d, hours) {
  var newDate = clone(d);
  newDate.setHours(d.getHours() + hours);
  return newDate;
}

function addMinutes(d, minutes) {
  var newDate = clone(d);
  newDate.setMinutes(d.getMinutes() + minutes);
  return newDate;
}

function addSeconds(d, seconds) {
  var newDate = clone(d);
  newDate.setSeconds(d.getMinutes() + seconds);
  return newDate;
}

function clone(d) {
  return new Date(d.getTime());
}

/**
 * @param date [Date] A Date object.
 * @param timezone [String] A Canonical timezone.
 * @param format [String] One of 'ampm', '24hr', defaults to 'ampm'.
 * @param pedantic [Boolean] Check time-picker/time-picker.jsx file.
 *
 * @return String A string representing the formatted time.
 */
function formatTime(date, timeZone) {
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ampm';
  var pedantic = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!date) return '';
  var dateParts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
    timeZone: timeZone
  }).formatToParts(date);

  var hours = (0, _parseInt2.default)(dateParts[0].value, 10);
  var mins = dateParts[2].value;

  if (format === 'ampm') {
    var isAM = hours < 12;
    hours = hours % 12;
    var additional = isAM ? ' am' : ' pm';
    hours = (hours || 12).toString();

    if (mins.length < 2) mins = '0' + mins;

    if (pedantic) {
      // Treat midday/midnight specially http://www.nist.gov/pml/div688/times.cfm
      if (hours === '12' && mins === '00') {
        return additional === ' pm' ? '12 noon' : '12 midnight';
      }
    }

    return hours + (mins === '00' ? '' : ':' + mins) + additional;
  }

  hours = hours.toString();

  if (hours.length < 2) hours = '0' + hours;
  if (mins.length < 2) mins = '0' + mins;

  return hours + ':' + mins;
}

function rad2deg(rad) {
  return rad * 57.29577951308232;
}

function getTouchEventOffsetValues(event) {
  var el = event.target;
  var boundingRect = el.getBoundingClientRect();

  return {
    offsetX: event.clientX - boundingRect.left,
    offsetY: event.clientY - boundingRect.top
  };
}

function isInner(props) {
  if (props.type !== 'hour') {
    return false;
  }
  return props.value < 1 || props.value > 12;
}