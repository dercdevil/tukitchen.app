const statusToToneMap = {
    "IN-PROGRESS": {
        color: "warning",
        text: "En proceso"
    },
    "SUCCESS": {
        color: "success",
        text: "confirmado"
    },
    "FAIL": {
        color: "error",
        text: "denegada"
    },
    "REJECT": {
        color: "error",
        text: "cancelada"
    },
    1: {
        color: "warning",
        text: "En proceso"
    },
    2: {
        color: "success",
        text: "confirmado"
    },
    3: {
        color: "error",
        text: "denegada"
    },
    4: {
        color: "error",
        text: "cancelada"
    }
}

export const mapStatusToTone = status => statusToToneMap[status].color;
export const mapStatusToText = status => statusToToneMap[status].text;