/**
 * 工作时间计算
 * @param {*} initData 
 */
function WorkTimeCalculation(initData) {
	this.getWorkTime = getWorkTime;


	/* var initData = {
		"Comments": "工作开始时间（结束时间）必须使用“:”进行分隔；break 为中断时间，比如，上班时间为 8：00，下班时间为18：00，中间休息2小时，12:00 - 14:00,则上午时间为 8:00 - 12:00 下午时间为 14:00-16:00；节日配置：日期使用月日，必须使用“-”分隔;数组的第一个位置为开始时间，数据第二个位置为结束时间，两个位置固定必须存在，否则此节日将被忽略;statutoryAdjustment为调休工作日，注意不记录休息日，只记录工作日",
		"workStartTime": "00:00",
		"workEndTime": "00:00",
		"break": ["12:00", "12:00"],
		"data": {
			"2017": {
				"newYear": ["12-31", "01-02"],
				"chineseNewYear": ["01-27", "02-02"],
				"qingmingFestival": ["04-02", "04-04"],
				"laborDay": ["04-29", "05-01"],
				"dragonBoatFestival": ["05-28", "05-30"],
				"midAutumnFestival": ["10-08", "10-08"],
				"nationalDay": ["10-01", "10-07"],
				"statutoryAdjustment": ["01-22", "02-04", "04-01", "05-27", "09-30"]
			},
			"2018": {
				"newYear": ["12-30", "01-01"],
				"chineseNewYear": ["02-15", "02-21"],
				"qingmingFestival": ["04-05", "04-07"],
				"dragonBoatFestival": ["06-16", "06-18"],
				"laborDay": ["04-29", "05-01"],
				"midAutumnFestival": ["09-22", "09-24"],
				"nationalDay": ["10-01", "10-07"],
				"statutoryAdjustment": ["02-11", "02-24", "04-08", "04-28", "09-29", "09-30"]
			}
		}
	}; */



	function getWorkTime(initData, startTime, endTime) {

		var workBreakTimeLong = getWorkBreakTimeLong(initData);
		var oneWorkDayTimeLong = getOneWorkDayTimeLong(initData) - workBreakTimeLong;

		if (oneWorkDayTimeLong <= 0) {
			console.error("工作开始时间小于工作结束时间，请检查配置 workStartTime = " + initData.workStartTime + ", workEndTime = " + initData.workEndTime);
			return;
		}


		var workDayTimeLongList = getWorkDayTimeLongList(initData, startTime, endTime, oneWorkDayTimeLong, workBreakTimeLong);

		var workTimeLong = 0;

		for (var item in workDayTimeLongList) {
			workTimeLong += workDayTimeLongList[item];
		}

		return workTimeLong;

	}//end of getWorkTime




	//得到从开始到结束每一天工作时间列表
	function getWorkDayTimeLongList(initData, startTime, endTime, oneWorkDayTimeLong) {
		var workTimeLongList = [];
		var basicDays = listDateFromeStartToEndWithoutStartAndEnd(startTime, endTime);

		//开始时间情况分析
		if (isWorkDay(startTime, initData)) {
			var startWorkDayStatusArray = getWorkDayStatusArray(startTime, initData);
			var startTimeMillSec = startTime.getTime();
			//上午上班之前，则计全天
			if (startTimeMillSec <= startWorkDayStatusArray[0]) {
				workTimeLongList.push(oneWorkDayTimeLong);
			} else if (startTimeMillSec > startWorkDayStatusArray[0]
				&& startTimeMillSec <= startWorkDayStatusArray[1]) {
				//在上午上班时间
				workTimeLongList.push(
					(startWorkDayStatusArray[1] - startTimeMillSec)
					+
					(startWorkDayStatusArray[3] - startWorkDayStatusArray[2])
				);
			} else if (startTimeMillSec > startWorkDayStatusArray[1] &&
				startTimeMillSec <= startWorkDayStatusArray[2]
			) {
				//在午休时间
				workTimeLongList.push(
					(startWorkDayStatusArray[3] - startWorkDayStatusArray[2])
				);
			} else if (startTimeMillSec > startWorkDayStatusArray[2] &&
				startTimeMillSec <= startWorkDayStatusArray[3]) {
				//下午上班时间
				workTimeLongList.push(
					(startWorkDayStatusArray[3] - startTimeMillSec)
				);
			} else {
				//下午下班时间，无值
			}
		}

		//中间时间分析
		for (var item in basicDays) {
			if (isWorkDay(basicDays[item], initData)) {
				workTimeLongList.push(oneWorkDayTimeLong);
			}
		}


		//TODO:结束时间情况分析
		if (isWorkDay(endTime, initData)) {
			var endWorkDayStatusArray = getWorkDayStatusArray(endTime, initData);
			var endTimeMillSec = endTime.getTime();

			if (endTimeMillSec <= endWorkDayStatusArray[0]) {
				//上午上班之前，不计数据
			} else if (endTimeMillSec > endWorkDayStatusArray[0]
				&& endTimeMillSec <= endWorkDayStatusArray[1]) {
				//在上午上班时间
				workTimeLongList.push(
					endTimeMillSec - endWorkDayStatusArray[0]
				);
			} else if (endTimeMillSec > endWorkDayStatusArray[1] &&
				endTimeMillSec <= endWorkDayStatusArray[2]
			) {
				//在午休时间
				workTimeLongList.push(
					(endWorkDayStatusArray[1] - endWorkDayStatusArray[0])
				);
			} else if (endTimeMillSec > endWorkDayStatusArray[2] &&
				endTimeMillSec <= endWorkDayStatusArray[3]) {
				//下午上班时间
				workTimeLongList.push(
					(endWorkDayStatusArray[1] - endWorkDayStatusArray[0])
					+
					(endTimeMillSec - endWorkDayStatusArray[2])
				);
			} else {
				//下午下班时间，计全天
				workTimeLongList.push(oneWorkDayTimeLong);
			}
		}

		return workTimeLongList;
	}


	//得到工作日时间列表：上午上班，上午下班，下午上班，下午下班
	function getWorkDayStatusArray(date, initData) {
		var workDayStatusArray = [];
		workDayStatusArray.push(newDateWithSomeDateAndStringTime(date, initData.workStartTime).getTime());
		workDayStatusArray.push(newDateWithSomeDateAndStringTime(date, initData.break[0]).getTime());
		workDayStatusArray.push(newDateWithSomeDateAndStringTime(date, initData.break[1]).getTime());
		if (isZeroTimeStr(initData.workEndTime)) {
			workDayStatusArray.push(newDateWithSomeDateAndStringTime(getNextDay(date), initData.workEndTime).getTime());
		} else {
			workDayStatusArray.push(newDateWithSomeDateAndStringTime(date, initData.workEndTime).getTime());
		}

		return workDayStatusArray;
	}


	//判断是不是工作日
	function isWorkDay(date, initData) {
		if (date instanceof Date) {
			var isWorkDay = null;
			//周末情况
			if (0 == date.getDay() || 6 == date.getDay()) {
				isWorkDay = false;
				if (isInStatutoryAdjustment(date, initData)) {
					isWorkDay = true;
				}
			} else {
				//非周末情况
				isWorkDay = true;
				if (isInFestival(date, initData)) {
					isWorkDay = false;
				}
			}
			return isWorkDay;
		} else {
			console.error("data 不是一个日期类型，无法判断是否是工作日！date = ") + date;
			return false;
		}

	}


	//是否在节假日中
	function isInFestival(date, initData) {
		initFestivalDaysList(date, initData);
		var year = "" + date.getFullYear();
		var festivalDaysList = initData.data[year].festivalDaysList;
		for (var item in festivalDaysList) {
			if (isSameDate(date, festivalDaysList[item])) {
				return true;
			}
		}

		//12月份可能有第二年的假期
		if (date.getMonth() == 11) {
			year = "" + (date.getFullYear() + 1);
			initFestivalDaysList(newDate(year), initData);
			festivalDaysList = initData.data[year].festivalDaysList;
			for (var item in festivalDaysList) {
				if (isSameDate(date, festivalDaysList[item])) {
					return true;
				}
			}
		}

		return false;

	}

	//是否在调休日中
	function isInStatutoryAdjustment(date, initData) {
		initInStatutoryAdjustmentDaysList(date, initData);
		var year = "" + date.getFullYear();
		var statutoryAdjustmentDaysList = initData.data[year].statutoryAdjustmentDaysList;
		for (var item in statutoryAdjustmentDaysList) {
			if (isSameDate(date, statutoryAdjustmentDaysList[item])) {
				return true;
			}
		}

		//12月份可能有第二年的调休
		if (date.getMonth() == 11) {
			year = "" + (date.getFullYear() + 1);
			initInStatutoryAdjustmentDaysList(newDate(year), initData);
			statutoryAdjustmentDaysList = initData.data[year].statutoryAdjustmentDaysList;
			for (var item in statutoryAdjustmentDaysList) {
				if (isSameDate(date, statutoryAdjustmentDaysList[item])) {
					return true;
				}
			}
		}

		return false;
	}




	//初始化节假日列表
	function initFestivalDaysList(date, initData) {
		var year = "" + date.getFullYear();
		if (!initData) initData = {};
		if (!initData.data) initData.data = {};
		if (!initData.data[year]) initData.data[year] = {};
		if (!(initData.data[year].festivalDaysList instanceof Array)) {
			//statutoryAdjustment
			var festivalDaysList = [];
			if (!initData.data[year]) {
				initData.data[year] = {
					festivalDaysList: []
				}
				return;
			}
			for (var item in initData.data[year]) {
				if ("statutoryAdjustment" == item || "statutoryAdjustmentDaysList" == item || "festivalDaysList" == item) {
					continue;
				}
				var faslist = initData.data[year][item];
				var aStartTime = newDateWithMonthDate(year, faslist[0]);
				var aEndTime = newDateWithMonthDate(year, faslist[1]);
				//新年12月为上一年的12月，年份减1
				if ("newYear" == item) {
					if (parseInt(faslist[0].split("-")[0]) == 12) {
						aStartTime = newDateWithMonthDate("" + (parseInt(year) - 1), faslist[0]);
					}
				}
				festivalDaysList = festivalDaysList.concat(listDateFromeStartToEndIncludeStartAndEnd(aStartTime, aEndTime));
			}
			initData.data[year].festivalDaysList = festivalDaysList;
		}
	}

	//初始化调休日列表
	function initInStatutoryAdjustmentDaysList(date, initData) {
		var year = "" + date.getFullYear();
		if (!initData) initData = {};
		if (!initData.data) initData.data = {};
		if (!initData.data[year]) initData.data[year] = {};
		if (!(initData.data[year].statutoryAdjustmentDaysList instanceof Array)) {
			var statutoryAdjustmentDaysList = [];
			if (!(initData.data[year].statutoryAdjustment instanceof Array)) {
				initData.data[year].statutoryAdjustment = [];
			}
			for (var item in initData.data[year].statutoryAdjustment) {
				var monthDate = initData.data[year].statutoryAdjustment[item];
				statutoryAdjustmentDaysList.push(newDateWithMonthDate(year, monthDate));
			}
			initData.data[year].statutoryAdjustmentDaysList = statutoryAdjustmentDaysList;
		}
	}


	//通过月日创建日期
	function newDateWithMonthDate(year, monthDate) {
		var monthDateList = monthDate.split("-");
		return newDate(year, parseInt(monthDateList[0]) - 1, monthDateList[1], 0, 0, 0);
	}


	//列出排除了开始日期和结束日期在内的中间的日期列表
	function listDateFromeStartToEndIncludeStartAndEnd(startTime, endTime) {
		var days = [];
		if ((endTime.getTime() - startTime.getTime()) <= 24 * 3600 * 1000) {
			if (startTime.getFullYear() == endTime.getFullYear()
				&& startTime.getMonth() == endTime.getMonth()
				&& startTime.getDate() == endTime.getDate()) {
				days.push(newDateWithSomeDate(startTime, 0, 0, 0));
			} else {
				days.push(newDateWithSomeDate(startTime, 0, 0, 0));
				days.push(newDateWithSomeDate(endTime, 0, 0, 0));
			}
			return days;
		}


		days.push(newDateWithSomeDate(startTime, 0, 0, 0));
		days = days.concat(listDateFromeStartToEndWithoutStartAndEnd(startTime, endTime));
		days.push(newDateWithSomeDate(endTime, 0, 0, 0));
		return days;
	}


	//列出排除了开始日期和结束日期在外的中间的日期列表
	function listDateFromeStartToEndWithoutStartAndEnd(startTime, endTime) {
		var days = [];
		startTime = newDateWithSomeDateAndStringTime(new Date(startTime.getTime() + 24 * 3600 * 1000), "00:00:00");
		endTime = newDateWithSomeDateAndStringTime(endTime, "00:00:00");

		//如果开始天的第二天就是结束天，则返回空数组
		if (isSameDate(startTime, endTime)) {
			return days;
		} else {
			days.push(startTime);
		}

		while (true) {
			startTime = getNextDay(startTime);
			if (startTime.getTime() >= endTime.getTime()) {
				break;
			} else {
				days.push(startTime);
			}
		}
		return days;
	}


	//判断是否是同一天
	function isSameDate(date1, date2) {
		return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();

	}


	//得到第二天
	function getNextDay(date) {
		if (!(date instanceof Date)) {
			date = new Date();
		}
		return new Date(date.getTime() + 24 * 3600 * 1000);
	}


	//得到一天的工作时间
	function getOneWorkDayTimeLong(initData) {
		if (!initData || !initData.workStartTime || !initData.workEndTime) {
			console.error("initData结构不正确，initData为空或workStartTime、workEndTime 为空 " + initData);
			return -1;
		}

		var today = new Date();
		var workStartTime = newDateWithSomeDateAndStringTime(today, initData.workStartTime);

		var workEndTime = null;
		if (isZeroTimeStr(initData.workEndTime)) {
			workEndTime = newDateWithSomeDateAndStringTime(new Date(today.getTime() + 24 * 3600 * 1000), initData.workEndTime);
		} else {
			workEndTime = newDateWithSomeDateAndStringTime(today, initData.workEndTime);
		}
		return workEndTime.getTime() - workStartTime.getTime();
	}


	//计算中间休息时间
	function getWorkBreakTimeLong(initData) {
		if (!initData || !initData.break[0] || !initData.break[1]) {
			console.error("initData结构不正确，initData为空，无break时间，或break时间开始结束时间不正确" + initData);
			return 0;
		}
		var today = new Date();
		var breakStart = newDateWithSomeDateAndStringTime(today, initData.break[0]);
		var breakEnd = newDateWithSomeDateAndStringTime(today, initData.break[1]);
		if (breakEnd.getTime() < breakStart.getTime()) {
			console.error("break 时间设置不正确，结束时间小于开始时间 : " + initData);
			return 0
		}
		return breakEnd.getTime() - breakStart.getTime();
	}



	//判断是否是0点
	function isZeroTimeStr(timeStr) {
		var timeStrArray = timeStr.split(":");
		return (0 == stringToInt(timeStrArray[0])
			&& 0 == stringToInt(timeStrArray[1])
			&& 0 == stringToInt(timeStrArray[2]))
	}


	//通过一个日期类型，和格式化的时分秒（如 00:00:00）创建一个日期
	function newDateWithSomeDateAndStringTime(date, timeStr) {
		var timeArr = timeStr.split(":");
		return newDateWithSomeDate(date, stringToInt(timeArr[0]),
			stringToInt(timeArr[1]),
			stringToInt(timeArr[2]));
	}

	//str转换成int,NaN 为 0 
	function stringToInt(str) {
		var returnVal = parseInt(str);
		if (isNaN(returnVal)) {
			returnVal = 0;
		}
		return returnVal;
	}

	//通过一个日期类型，和时分秒创建一个日期
	function newDateWithSomeDate(date, hour, minutes, seconds) {
		if (!(date instanceof Date)) {
			date = new Date();
		}
		return newDate(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes, seconds);
	}


	//通过年月日时分秒创建一个新的日期
	function newDate(year, month, date, hour, minutes, seconds) {
		if (isNaN(year)) year = 1970;
		if (isNaN(month)) month = 0;
		if (isNaN(date)) date = 1;
		if (isNaN(hour)) hour = 0;
		if (isNaN(minutes)) minutes = 0;
		if (isNaN(seconds)) seconds = 0;
		return new Date(year, month, date, hour, minutes, seconds);
	}

}
