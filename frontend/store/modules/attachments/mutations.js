const ATTACHMENTS_BY_UNIT = (state, payload) => {
    state.attachmentsByUnit = payload;
};

const ATTACHMENTS_BY_USER = (state, payload) => {
    state.attachmentsByUser = payload;
};

export default {
    ATTACHMENTS_BY_UNIT,
    ATTACHMENTS_BY_USER
}
