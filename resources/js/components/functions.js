import moment from "moment";

export function getPriceRounded(price) {

    return Math.round((price + Number.EPSILON) * 100) / 100;
}


export function getPromotions(promotions, start, days) {
    var init = moment(start);
    var min = undefined;
    var max = undefined;
    var factors = Array(days).fill(1);
    var index = 0;
    while (index < factors.length) {

        promotions.map((promotion) => {
            min = moment(promotion.start).startOf('day');
            max = moment(promotion.end).endOf('day');

            if (init.isBetween(min, max)) {
                factors[index] = promotion.factor;
            }
        })

        init.add(1, 'days');
        index++;
        if (index > 365) {
            break;
        }
    }

    return factors;
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

export function isDateDisabled(current, blockedDates, currentDates, registration = true) {
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
                tooLate = currentDates[0] && current.diff(currentDates[0], 'days') > 365;
                tooEarly = currentDates[0] && moment(current).startOf('day').diff(moment(currentDates[0]).startOf('day'), 'days') < 2;

                var currentBlockedDate = null;
                for (let index = 0; index < blockedDates.length; index++) {
                    var blockedDate = moment(blockedDates[index]);

                    if (blockedDate.isAfter(currentDates[0])) {
                        currentBlockedDate = blockedDate;
                        break;
                    }
                }

                if (currentBlockedDate) {
                    if (current.isAfter(currentBlockedDate)) {
                        tooLate = true;
                    }
                }

            }

            return !!tooEarly || !!tooLate;
        }
    }

}