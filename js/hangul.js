import assert from 'assert';

const telfmt = telstr => {
    const len = telstr?.length;
    if (len <= 8)
        return `${telstr.substring(0, len - 4)}-${telstr.substring(len - 4)}`;

    const a = telstr.startsWith('02') ? 2 : len === 12 ? 4 : 3;
    const b = len - 4 - a;

    const regex = new RegExp(`(\\d{${a}})(\\d{${b}})(\\d{${4}})`);
    return telstr.replace(regex, '$1-$2-$3');
};

function searchByKoreanInitialSound(strings, initialSound) {
  // 초성 매핑 테이블
  const initialSoundMap = {
    ㄱ: 'r', ㄲ: 'R', ㄴ: 's', ㄷ: 'e', ㄸ: 'E', ㄹ: 'f', ㅁ: 'a', ㅂ: 'q', ㅃ: 'Q', ㅅ: 't',
    ㅆ: 'T', ㅇ: 'd', ㅈ: 'w', ㅉ: 'W', ㅊ: 'c', ㅋ: 'z', ㅌ: 'x', ㅍ: 'v', ㅎ: 'g'
  };

  // 초성 변환 함수
  function convertToInitialSound(word) {
    let result = '';
    for (let i = 0; i < word.length; i++) {
      const charCode = word.charCodeAt(i);
      if (charCode >= 44032 && charCode <= 55203) { // 한글 범위
        const initialIndex = Math.floor((charCode - 44032) / 588);
        result += initialSoundMap[String.fromCharCode(0x3131 + initialIndex)];
      } else {
        result += word[i];
      }
    }
    return result;
  }

  // 검색
  const searchInitialSound = convertToInitialSound(initialSound);
  return strings.filter(str => convertToInitialSound(str).includes(searchInitialSound));
}

// 테스트 케이스
const s = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'];

function searchByKoreanInitialSound(strings, initialSound) {
    // 초성 매핑 테이블
    const initialSoundMap = {
      ㄱ: 'r', ㄲ: 'R', ㄴ: 's', ㄷ: 'e', ㄸ: 'E', ㄹ: 'f', ㅁ: 'a', ㅂ: 'q', ㅃ: 'Q', ㅅ: 't',
      ㅆ: 'T', ㅇ: 'd', ㅈ: 'w', ㅉ: 'W', ㅊ: 'c', ㅋ: 'z', ㅌ: 'x', ㅍ: 'v', ㅎ: 'g'
    };
  
    // 초성 변환 함수
    function convertToInitialSound(word) {
      let result = '';
      for (let i = 0; i < word.length; i++) {
        const charCode = word.charCodeAt(i);
        if (charCode >= 44032 && charCode <= 55203) { // 한글 범위
          const initialIndex = Math.floor((charCode - 44032) / 588);
          result += initialSoundMap[String.fromCharCode(0x3131 + initialIndex)];
        } else {
          result += word[i];
        }
      }
      return result;
    }
  
    // 검색
    const searchInitialSound = convertToInitialSound(initialSound);
    return strings.filter(str => convertToInitialSound(str).includes(searchInitialSound));
  }
  
  onsole.log(searchByKoreanInitialSound(s, 'ㄱㅇ')); // ['강원도 고성군']
  console.log(searchByKoreanInitialSound(s, 'ㄱㅅㄱ')); // ['강원도 고성군', '고성군 토성면']
  console.log(searchByKoreanInitialSound(s, 'ㅌㅅㅁ')); // ['고성군 토성면', '토성면 북면']
  console.log(searchByKoreanInitialSound(s, 'ㅂㅁ')); // ['토성면 북면', '북면']
  console.log(searchByKoreanInitialSound(s, 'ㅍㅁ')); // []
  console.log(searchByKoreanInitialSound(s, 'ㄱ1ㅅ')); // ['김1수']
  
  
assert.deepStrictEqual(telfmt('1577157'), '157-7157');
assert.deepStrictEqual(telfmt('15771577'), '1577-1577');
assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');
assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');
assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');
assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');
assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');
assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');
assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678');

const upperToLower = str => str.replace(/[A-Z]/g, s => s.toLowerCase());
assert.strictEqual(
    upperToLower('Senior Coding Learning JS'),
    'senior coding learning js'
);

//
