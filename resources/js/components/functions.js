import moment from "moment";

const hourTreshold = (1 / 24) * 2;


export function getPriceRounded(price) {

    return Math.round((price + Number.EPSILON) * 100) / 100;
}


export function getDaysDifference(from, to) {
    var differenceHour = moment(to).diff(moment(from), 'hours');

    var factor = differenceHour / 24;
    factor = (factor + "").split(".");

    var baseInt = parseInt(factor[0]);
    var baseDecimal = parseFloat("0." + factor[1]).toFixed(5);

    if (baseDecimal > hourTreshold.toFixed(5)) {
        baseInt++;
    }
    else if (baseDecimal == hourTreshold.toFixed(5)) {
        var differenceMin = moment(to).diff(moment(from), 'minutes');
        if (differenceMin - (differenceHour * 60) > 0) {
            baseInt++;
        }
    }

    return baseInt;
};

export function getPromotions(promotions, start, days) {
    var init = moment(start);
    var min = undefined;
    var max = undefined;
    var factors = Array(days).fill({ value: 1, priority: 1 });
    var index = 0;
    while (index < factors.length) {

        promotions.map((promotion) => {
            min = moment(promotion.start).startOf('day');
            max = moment(promotion.end).endOf('day');

            if (init.isBetween(min, max)) {
                if (factors[index].priority <= promotion.priority) {
                    factors[index] = { value: promotion.factor, priority: promotion.priority };
                }
            }
        })

        init.add(1, 'days');
        index++;
        if (index > 365) {
            break;
        }
    }
    var response = [];
    factors.map((factor) => {
        response.push(factor.value);
    })

    return response;
}

export function getCarPrice(prices, days, factors) {
    var value = prices[2].price;
    prices.map((price) => {
        if (days >= price.min && days <= price.max) {
            value = price.price;
        }
    })

    var array = Array(days).fill(value);
    var carPrice = 0;

    array.map((day, index) => {
        carPrice += day * factors[index];
    });

    return carPrice;
}

export function getInsurancePrice(insurances, days) {
    console.log(insurances.find((e) => { return e.name.pt == "Premium" }));
    console.log(days);
    return parseFloat(insurances.find((e) => { return e.name.pt == "Premium" }).price) * days;

}

export function isDateDisabled(current, blockedDates, currentDates, index, maximumValues, registration = true) {
    if (!registration) {
        return true;
    }
    let isBlocked = blockedDates.includes(current.format("YYYY-MM-DD"));

    if (isBlocked) {
        return true
    } else {
        let tomorrow = moment().add(1, 'days').format("YYYY-MM-DD HH:mm");
        if (current && (current.isBefore(tomorrow))) {
            return true
        } else {
            let tooEarly = false;
            let tooLate = false;

            if (currentDates) {
                var condition = false;
                if (index != 0) {
                    condition = currentDates[0];
                }

                tooLate = condition ? current.diff(currentDates[0], 'days') > maximumValues[0] : current.isAfter(maximumValues[1], 'days');
                tooEarly = condition ?
                    moment(current).startOf('day').diff(moment(currentDates[0]).startOf('day'), 'days') < 2
                    : moment(current).startOf('day').diff(moment().startOf('day'), 'days') < 2;

                var nextBlockedDate = null;
                if (condition) {
                    for (let index = 0; index < blockedDates.length; index++) {
                        var blockedDate = moment(blockedDates[index]);

                        if (blockedDate.isAfter(currentDates[0])) {
                            nextBlockedDate = blockedDate;
                            break;
                        }
                    }
                }


                if (nextBlockedDate) {
                    if (current.isAfter(nextBlockedDate)) {
                        tooLate = true;
                    }
                }

            }

            return !!tooEarly || !!tooLate;
        }
    }

}


export function isTimeDisabled(dates, type) {
    // console.log(dates);
    // console.log(type);
    // if (type == "end" && dates[0] && dates[1]) {
    //     var tooEarly = moment(dates[0]).diff(dates[1], 'days') == 1;
    //     console.log(moment(dates[0]).diff(dates[1], 'days'));
    //     var hour = 0;
    //     var blocked = [];
    //     var initHour = dates[0].hour();

    //     if (tooEarly) {
    //         while (hour < 24) {
    //             if (hour < initHour) {
    //                 blocked.push(hour);
    //             }
    //             hour++;
    //         }
    //     }

    //     return blocked.concat([0, 1, 2, 3, 4, 5, 6, 23])

    // }

    return [0, 1, 2, 3, 4, 5, 6, 23];

}