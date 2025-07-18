/**
 * BV号与AV号互转工具
 * 基于 https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/bvid_desc.md
 */

const XOR_CODE = 23442827791579;
const MASK_CODE = 2251799813685247;
const MAX_AID = 1 << 51;
const ALPHABET = "FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf";
const ENCODE_MAP = [8, 7, 0, 5, 1, 3, 2, 4, 6];
const DECODE_MAP = [2, 4, 1, 5, 7, 3, 6, 0, 8];

const BASE = ALPHABET.length;
const PREFIX = "BV1";
const PREFIX_LEN = PREFIX.length;
const CODE_LEN = ENCODE_MAP.length;

/**
 * AV号转BV号
 * @param aid AV号
 * @returns BV号
 */
export function av2bv(aid: number): string {
  const bvid: string[] = new Array(9);
  let tmp = (MAX_AID | aid) ^ XOR_CODE;
  
  for (let i = 0; i < CODE_LEN; i++) {
    bvid[ENCODE_MAP[i]] = ALPHABET[tmp % BASE];
    tmp = Math.floor(tmp / BASE);
  }
  
  return PREFIX + bvid.join('');
}

/**
 * BV号转AV号
 * @param bvid BV号
 * @returns AV号
 */
export function bv2av(bvid: string): number {
  if (!bvid.startsWith(PREFIX)) {
    throw new Error(`Invalid BV ID: ${bvid}`);
  }

  const code = bvid.slice(PREFIX_LEN);
  let tmp = 0;
  
  for (let i = 0; i < CODE_LEN; i++) {
    const idx = ALPHABET.indexOf(code[DECODE_MAP[i]]);
    if (idx === -1) {
      throw new Error(`Invalid character in BV ID: ${code[DECODE_MAP[i]]}`);
    }
    tmp = tmp * BASE + idx;
  }
  
  return (tmp & MASK_CODE) ^ XOR_CODE;
}

/**
 * 检查是否为有效的BV号
 * @param bvid BV号
 * @returns 是否有效
 */
export function isValidBvid(bvid: string): boolean {
  if (!bvid.startsWith(PREFIX) || bvid.length !== PREFIX_LEN + CODE_LEN) {
    return false;
  }
  
  const code = bvid.slice(PREFIX_LEN);
  return code.split('').every(char => ALPHABET.includes(char));
}

/**
 * 检查是否为有效的AV号
 * @param aid AV号
 * @returns 是否有效
 */
export function isValidAid(aid: number): boolean {
  return Number.isInteger(aid) && aid > 0 && aid < MAX_AID;
}

/**
 * 从URL中提取视频ID
 * @param url B站视频URL
 * @returns {bvid?: string, aid?: number}
 */
export function extractVideoId(url: string): { bvid?: string; aid?: number } {
  const bvMatch = url.match(/BV[a-zA-Z0-9]+/);
  const avMatch = url.match(/av(\d+)/);
  
  const result: { bvid?: string; aid?: number } = {};
  
  if (bvMatch && isValidBvid(bvMatch[0])) {
    result.bvid = bvMatch[0];
  }
  
  if (avMatch) {
    const aid = parseInt(avMatch[1]);
    if (isValidAid(aid)) {
      result.aid = aid;
    }
  }
  
  return result;
}
