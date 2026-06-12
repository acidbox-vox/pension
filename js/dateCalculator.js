// ========================================
// dateCalculator.js
// คำนวณอายุราชการ
// วันบรรจุนับ
// วันออกไม่นับ
// Normalize 30 วัน = 1 เดือน
// 12 เดือน = 1 ปี
// ========================================

// --------------------------
// แปลงวันที่เป็น พ.ศ.
// --------------------------

function formatThaiDate(date) {

    const months = [
        "ม.ค.","ก.พ.","มี.ค.","เม.ย.",
        "พ.ค.","มิ.ย.","ก.ค.","ส.ค.",
        "ก.ย.","ต.ค.","พ.ย.","ธ.ค."
    ];

    return `${date.getDate()} ${
        months[date.getMonth()]
    } ${date.getFullYear()+543}`;

}

// --------------------------
// Normalize
// 30 วัน = 1 เดือน
// 12 เดือน = 1 ปี
// --------------------------

function normalizeTime(years, months, days) {

    if (days >= 30) {

        months += Math.floor(days / 30);
        days = days % 30;

    }

    if (months >= 12) {

        years += Math.floor(months / 12);
        months = months % 12;

    }

    return {
        years,
        months,
        days
    };

}

// --------------------------
// รวมอายุราชการ
// + วันทวีคูณ
// --------------------------

function combineServiceAndBonus(
    service,
    bonus
) {

    let years =
        service.years +
        bonus.years;

    let months =
        service.months +
        bonus.months;

    let days =
        service.days +
        bonus.days;

    return normalizeTime(
        years,
        months,
        days
    );

}

// --------------------------
// สูตร Excel
//
// ROUNDDOWN(
// ปี+เดือน/12+วัน/360,
// 2
// )
// --------------------------

function calculateServiceDecimal(
    years,
    months,
    days
) {

    return Math.floor(

        (
            years +
            (months / 12) +
            (days / 360)
        )

        * 100

    ) / 100;

}

// --------------------------
// คำนวณอายุราชการ
//
// วันบรรจุ = นับ
// วันออก = ไม่นับ
//
// เช่น
//
// 1 ม.ค.
// ถึง
// 1 ต.ค.
//
// จะนับถึง
// 30 ก.ย.
// --------------------------

function calculateServiceAge(
    startDateString,
    endDateString
) {

    if (
        !startDateString ||
        !endDateString
    ) {

        return {
            years:0,
            months:0,
            days:0
        };

    }

    const start =
        new Date(startDateString);

    const end =
        new Date(endDateString);

    // ------------------
    // วันออกไม่นับ
    // ------------------

    end.setDate(
        end.getDate() - 1
    );

    let years =
        end.getFullYear() -
        start.getFullYear();

    let months =
        end.getMonth() -
        start.getMonth();

    let days =
        end.getDate() -
        start.getDate();

    // ------------------
    // ยืมวัน
    // ------------------

    if (days < 0) {

        months--;

        days += 30;

    }

    // ------------------
    // ยืมเดือน
    // ------------------

    if (months < 0) {

        years--;

        months += 12;

    }

    return {

        years,
        months,
        days

    };

}

// --------------------------
// แปลง object เป็นข้อความ
// --------------------------

function formatYMD(data) {

    return `${data.years} ปี ${data.months} เดือน ${data.days} วัน`;

}

// --------------------------
// อ่านวันทวีคูณจากหน้าเว็บ
// --------------------------

function getBonusTime() {

    return {

        years:
            parseInt(
                document.getElementById(
                    "bonusYear"
                ).value
            ) || 0,

        months:
            parseInt(
                document.getElementById(
                    "bonusMonth"
                ).value
            ) || 0,

        days:
            parseInt(
                document.getElementById(
                    "bonusDay"
                ).value
            ) || 0

    };

}

// --------------------------
// คำนวณอายุราชการทั้งหมด
// --------------------------

function getTotalService() {

    const startDate =
        document.getElementById(
            "startDate"
        ).value;

    const endDate =
        document.getElementById(
            "endDate"
        ).value;

    const service =
        calculateServiceAge(
            startDate,
            endDate
        );

    const bonus =
        getBonusTime();

    const total =
        combineServiceAndBonus(
            service,
            bonus
        );

    return {

        service,
        bonus,
        total,

        serviceDecimal:

            calculateServiceDecimal(
                total.years,
                total.months,
                total.days
            )

    };

}