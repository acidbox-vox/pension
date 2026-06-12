// ========================================
// salaryCalculator.js
// เงินเดือนเฉลี่ย 60 เดือน
// 2 โหมด
//
// 1. กรอกเอง
// 2. 10 งวด × 6 เดือน
// ========================================

// ----------------------------------------
// แปลงเดือนเป็นภาษาไทย
// ----------------------------------------

const THAI_MONTHS = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค."
];

// ----------------------------------------
// สร้าง 10 งวดย้อนหลัง
//
// ตัวอย่าง
//
// วันออก 01/10/2569
//
// เม.ย.2569
// ต.ค.2568
// เม.ย.2568
// ...
//
// ย้อนครั้งละ 6 เดือน
// ----------------------------------------

function generatePeriods() {

    const endDateInput =
        document.getElementById(
            "endDate"
        ).value;

    if (!endDateInput) {

        alert(
            "กรุณาเลือกวันออกจากราชการก่อน"
        );

        return;

    }

    const container =
        document.getElementById(
            "salaryPeriods"
        );

    container.innerHTML = "";

    const endDate =
        new Date(endDateInput);

    // เริ่มย้อนหลัง 6 เดือน

    let current =
        new Date(endDate);

    current.setMonth(
        current.getMonth() - 6
    );

    for (
        let i = 1;
        i <= 10;
        i++
    ) {

        const month =
            current.getMonth();

        const yearBE =
            current.getFullYear() + 543;

        const label =
            `${THAI_MONTHS[month]} ${yearBE}`;

        const row =
            document.createElement(
                "div"
            );

        row.className =
            "period-row";

        row.innerHTML = `

            <input
                type="text"
                value="${label}"
                readonly>

            <input
                type="number"
                class="salary-input"
                data-index="${i}"
                placeholder="เงินเดือน">

            <input
                type="number"
                class="month-input"
                value="6"
                readonly>

        `;

        container.appendChild(
            row
        );

        // ย้อนอีก 6 เดือน

        current.setMonth(
            current.getMonth() - 6
        );

    }

    attachSalaryEvents();

    calculateAverage60Months();

}

// ----------------------------------------
// ผูก Event
// ----------------------------------------

function attachSalaryEvents() {

    const salaryInputs =
        document.querySelectorAll(
            ".salary-input"
        );

    salaryInputs.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                calculateAverage60Months();

                if (
                    typeof calculate ===
                    "function"
                ) {

                    calculate();

                }

            }
        );

    });

}

// ----------------------------------------
// คำนวณเฉลี่ย 60 เดือน
//
// SUM(
// เงินเดือน × เดือน
// )
//
// ÷
//
// SUM(เดือน)
//
// ----------------------------------------

function calculateAverage60Months() {

    const salaries =
        document.querySelectorAll(
            ".salary-input"
        );

    const months =
        document.querySelectorAll(
            ".month-input"
        );

    let totalMoney = 0;

    let totalMonth = 0;

    salaries.forEach(
        (salaryInput,index) => {

        const salary =

            parseFloat(
                salaryInput.value
            ) || 0;

        const month =

            parseFloat(
                months[index].value
            ) || 0;

        totalMoney +=
            salary * month;

        totalMonth +=
            month;

    });

    let average = 0;

    if (totalMonth > 0) {

        average =
            totalMoney /
            totalMonth;

    }

    const avgDisplay =
        document.getElementById(
            "avgSalaryDisplay"
        );

    if (avgDisplay) {

        avgDisplay.innerText =

            formatMoney(
                average
            ) +

            " บาท";

    }

    return average;

}

// ----------------------------------------
// อ่านค่าเฉลี่ย
// ----------------------------------------

function getAverageSalary() {

    const mode =

        document.querySelector(
            'input[name="avgMode"]:checked'
        ).value;

    // --------------------
    // กรอกเอง
    // --------------------

    if (
        mode === "manual"
    ) {

        return parseFloat(

            document.getElementById(
                "avgSalary"
            ).value

        ) || 0;

    }

    // --------------------
    // 10 งวด
    // --------------------

    return calculateAverage60Months();

}

// ----------------------------------------
// สลับโหมด
// ----------------------------------------

function toggleAverageMode() {

    const mode =

        document.querySelector(
            'input[name="avgMode"]:checked'
        ).value;

    const manualSection =

        document.getElementById(
            "manualSection"
        );

    const historySection =

        document.getElementById(
            "historySection"
        );

    if (
        mode === "manual"
    ) {

        manualSection.style.display =
            "block";

        historySection.style.display =
            "none";

    }
    else {

        manualSection.style.display =
            "none";

        historySection.style.display =
            "block";

    }

}

// ----------------------------------------
// จัดรูปแบบเงิน
// ----------------------------------------

function formatMoney(value) {

    return Number(
        value || 0
    ).toLocaleString(
        "th-TH",
        {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }
    );

}