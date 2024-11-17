enum ReasonType {
    default = '',
    Offtopic = 'Off-topic',
    TooHeated = 'Too heated',
    Resolved = 'Resolved',
    Spam = 'Spam',
}

enum StateType {
    completed = 'completed',
    reopened = 'reopened',
    deleted = 'deleted',
}

export {
    ReasonType,
    StateType,
}