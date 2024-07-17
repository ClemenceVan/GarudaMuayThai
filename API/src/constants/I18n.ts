/* I18n Success */
export const success = {
    200: {
        success: "success.200.success",
        updated: "success.200.updated",
        deleted: "success.200.deleted",
        activated: "success.200.activated",
        sentIfExist: "success.200.sentIfExist"
    },
    201: {
        created: "success.201.created"
    }
}

/* I18n Errors */
export const error = {
  400: {
    parser: {
      unknownSource: "error.400.parser.unknownSource",
      missingField: "error.400.parser.missingField",
      invalidField: "error.400.parser.invalidField",
      invalidFieldInArray: "error.400.parser.invalidFieldInArray",
      invalidValue: "error.400.parser.invalidValue",
      unknownField: "error.400.parser.unknownField",
      invalidType: "error.400.parser.invalidType",
      invalidDateFormat: "error.400.parser.invalidDateFormat",
      notOneOf: "error.400.parser.notOneOf",
      invalidRegex: "error.400.parser.invalidRegex",
      invalidLength: "error.400.parser.invalidLength",
      invalidLimit: "error.400.parser.invalidLimit"
    },
    bot: {
      alreadySubscribed: "error.400.bot.alreadySubscribed",
      notSubscribed: "error.400.bot.notSubscribed",
    },
    alreadyExists: "error.400.alreadyExists",
    invalidOrExpired: "error.400.invalidOrExpired",
    mismatchBetween: "error.400.mismatchBetween",
    notVerified: "error.400.notVerified",
    invalidField: "error.400.invalidField",
    badRequest: "error.400.badRequest",
    failed: "error.400.failed"
  },
  401: {
    unauthorized: "error.401.unauthorized",
    notOwned: "error.401.notOwned"
  },
  403: {
    forbidden: "error.403.forbidden"
  },
  404: {
    fieldNotFound: "error.404.fieldNotFound",
    pageNotFound: "error.404.pageNotFound"
  },
  500: {
    internalError: "error.500.internalError"
  }
}

/* I18n lang */
export const en = "en";
export const fr = "fr";