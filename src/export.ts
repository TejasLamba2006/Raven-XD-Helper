import { PermissionFlagsBits } from "discord.js";
import { z } from "zod";

export const config = z
  .object({
    TOKEN: z.string(),
    PREFIX: z.string(),
    GITHUB_LOGS_CHANNEL_ID: z.string(),
    REVIEW_CHANNEL_ID: z.string(),
    REVIEW_CHANNEL_LOGS_ID: z.string(),
  })
  .parse(process.env);

export const PERMISSIONS = [
  PermissionFlagsBits.ManageChannels,
  PermissionFlagsBits.ManageGuild,
  PermissionFlagsBits.ViewAuditLog,
  PermissionFlagsBits.CreateInstantInvite,
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.ReadMessageHistory,
  PermissionFlagsBits.UseExternalEmojis,
];

export const keyCodeMap: { [key: number]: string } = {
  0: "KEY_NONE",
  1: "KEY_ESCAPE",
  2: "KEY_1",
  3: "KEY_2",
  4: "KEY_3",
  5: "KEY_4",
  6: "KEY_5",
  7: "KEY_6",
  8: "KEY_7",
  9: "KEY_8",
  10: "KEY_9",
  11: "KEY_0",
  12: "KEY_MINUS",
  13: "KEY_EQUALS",
  14: "KEY_BACK",
  15: "KEY_TAB",
  16: "KEY_Q",
  17: "KEY_W",
  18: "KEY_E",
  19: "KEY_R",
  20: "KEY_T",
  21: "KEY_Y",
  22: "KEY_U",
  23: "KEY_I",
  24: "KEY_O",
  25: "KEY_P",
  26: "KEY_LBRACKET",
  27: "KEY_RBRACKET",
  28: "KEY_RETURN",
  29: "KEY_LCONTROL",
  30: "KEY_A",
  31: "KEY_S",
  32: "KEY_D",
  33: "KEY_F",
  34: "KEY_G",
  35: "KEY_H",
  36: "KEY_J",
  37: "KEY_K",
  38: "KEY_L",
  39: "KEY_SEMICOLON",
  40: "KEY_APOSTROPHE",
  41: "KEY_GRAVE",
  42: "KEY_LSHIFT",
  43: "KEY_BACKSLASH",
  44: "KEY_Z",
  45: "KEY_X",
  46: "KEY_C",
  47: "KEY_V",
  48: "KEY_B",
  49: "KEY_N",
  50: "KEY_M",
  51: "KEY_COMMA",
  52: "KEY_PERIOD",
  53: "KEY_SLASH",
  54: "KEY_RSHIFT",
  55: "KEY_MULTIPLY",
  56: "KEY_LMENU",
  57: "KEY_SPACE",
  58: "KEY_CAPITAL",
  59: "KEY_F1",
  60: "KEY_F2",
  61: "KEY_F3",
  62: "KEY_F4",
  63: "KEY_F5",
  64: "KEY_F6",
  65: "KEY_F7",
  66: "KEY_F8",
  67: "KEY_F9",
  68: "KEY_F10",
  69: "KEY_NUMLOCK",
  70: "KEY_SCROLL",
  71: "KEY_NUMPAD7",
  72: "KEY_NUMPAD8",
  73: "KEY_NUMPAD9",
  74: "KEY_SUBTRACT",
  75: "KEY_NUMPAD4",
  76: "KEY_NUMPAD5",
  77: "KEY_NUMPAD6",
  78: "KEY_ADD",
  79: "KEY_NUMPAD1",
  80: "KEY_NUMPAD2",
  81: "KEY_NUMPAD3",
  82: "KEY_NUMPAD0",
  83: "KEY_DECIMAL",
  87: "KEY_F11",
  88: "KEY_F12",
  100: "KEY_F13",
  101: "KEY_F14",
  102: "KEY_F15",
  103: "KEY_F16",
  104: "KEY_F17",
  105: "KEY_F18",
  112: "KEY_KANA",
  113: "KEY_F19",
  121: "KEY_CONVERT",
  123: "KEY_NOCONVERT",
  125: "KEY_YEN",
  141: "KEY_NUMPADEQUALS",
  144: "KEY_CIRCUMFLEX",
  145: "KEY_AT",
  146: "KEY_COLON",
  147: "KEY_UNDERLINE",
  148: "KEY_KANJI",
  149: "KEY_STOP",
  150: "KEY_AX",
  151: "KEY_UNLABELED",
  156: "KEY_NUMPADENTER",
  157: "KEY_RCONTROL",
  167: "KEY_SECTION",
  179: "KEY_NUMPADCOMMA",
  181: "KEY_DIVIDE",
  183: "KEY_SYSRQ",
  184: "KEY_RMENU",
  196: "KEY_FUNCTION",
  197: "KEY_PAUSE",
  199: "KEY_HOME",
  200: "KEY_UP",
  201: "KEY_PRIOR",
  203: "KEY_LEFT",
  205: "KEY_RIGHT",
  207: "KEY_END",
  208: "KEY_DOWN",
  209: "KEY_NEXT",
  210: "KEY_INSERT",
  211: "KEY_DELETE",
  218: "KEY_CLEAR",
  219: "KEY_LMETA",
  220: "KEY_RMETA",
  221: "KEY_APPS",
  222: "KEY_POWER",
  223: "KEY_SLEEP",
  1001: "MOUSE_LEFT",
  1002: "MOUSE_RIGHT",
  1003: "MOUSE_MIDDLE",
  1004: "MOUSE_4",
  1005: "MOUSE_5",
  1006: "MOUSE_WHEEL_UP",
  1007: "MOUSE_WHEEL_DOWN",
  1008: "MOUSE_WHEEL_LEFT",
  1009: "MOUSE_WHEEL_RIGHT",
};

export interface Module {
  name: string;
  prettyName: string;
  enabled: boolean;
  hidden: boolean;
  keybind: number;
  [key: string]: string | number | boolean;
}

export interface Profile {
  bName: string;
  keybind: number;
  modules: Module[];
}
