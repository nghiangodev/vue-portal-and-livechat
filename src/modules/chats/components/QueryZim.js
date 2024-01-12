import moment from "moment/moment";

export const queryHistoryMessage = (zim, groupId, type, config) => {
    return zim.queryHistoryMessage(groupId, type, config)
}