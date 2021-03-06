import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { getCityChildren, getCityChildrenWithDistrict } from "../lgcode.mjs";

Deno.test("県内の地方公共団体コードを得る", async () => {
  assertEquals(
    getCityChildren(18000),
    [
      [18201, "福井市"],
      [18202, "敦賀市"],
      [18204, "小浜市"],
      [18205, "大野市"],
      [18206, "勝山市"],
      [18207, "鯖江市"],
      [18208, "あわら市"],
      [18209, "越前市"],
      [18210, "坂井市"],
      [18322, "永平寺町"],
      [18382, "池田町"],
      [18404, "南越前町"],
      [18423, "越前町"],
      [18442, "美浜町"],
      [18481, "高浜町"],
      [18483, "おおい町"],
      [18501, "若狭町"],
    ],
  );
});
Deno.test("県内の地方公共団体コードを得る（文字列）", async () => {
  assertEquals(
    getCityChildren("18000"),
    [
      [18201, "福井市"],
      [18202, "敦賀市"],
      [18204, "小浜市"],
      [18205, "大野市"],
      [18206, "勝山市"],
      [18207, "鯖江市"],
      [18208, "あわら市"],
      [18209, "越前市"],
      [18210, "坂井市"],
      [18322, "永平寺町"],
      [18382, "池田町"],
      [18404, "南越前町"],
      [18423, "越前町"],
      [18442, "美浜町"],
      [18481, "高浜町"],
      [18483, "おおい町"],
      [18501, "若狭町"],
    ],
  );
});
Deno.test("県内の地方公共団体コードを得る（名前）", async () => {
  assertEquals(
    getCityChildren("18000"),
    [
      [18201, "福井市"],
      [18202, "敦賀市"],
      [18204, "小浜市"],
      [18205, "大野市"],
      [18206, "勝山市"],
      [18207, "鯖江市"],
      [18208, "あわら市"],
      [18209, "越前市"],
      [18210, "坂井市"],
      [18322, "永平寺町"],
      [18382, "池田町"],
      [18404, "南越前町"],
      [18423, "越前町"],
      [18442, "美浜町"],
      [18481, "高浜町"],
      [18483, "おおい町"],
      [18501, "若狭町"],
    ],
  );
});
Deno.test("県内の地方公共団体コードを得る（郡を含む）", async () => {
  assertEquals(
    getCityChildrenWithDistrict(18000),
    [
      [18201, "福井市"],
      [18202, "敦賀市"],
      [18204, "小浜市"],
      [18205, "大野市"],
      [18206, "勝山市"],
      [18207, "鯖江市"],
      [18208, "あわら市"],
      [18209, "越前市"],
      [18210, "坂井市"],
      [18320, "吉田郡"],
      [18380, "今立郡"],
      [18400, "南条郡"],
      [18420, "丹生郡"],
      [18440, "三方郡"],
      [18480, "大飯郡"],
      [18500, "三方上中郡"],
    ],
  );
});
Deno.test("全都道府県を得る", async () => {
  assertEquals(
    getCityChildren(0),
    [
      [1000, "北海道"],
      [2000, "青森県"],
      [3000, "岩手県"],
      [4000, "宮城県"],
      [5000, "秋田県"],
      [6000, "山形県"],
      [7000, "福島県"],
      [8000, "茨城県"],
      [9000, "栃木県"],
      [10000, "群馬県"],
      [11000, "埼玉県"],
      [12000, "千葉県"],
      [13000, "東京都"],
      [14000, "神奈川県"],
      [15000, "新潟県"],
      [16000, "富山県"],
      [17000, "石川県"],
      [18000, "福井県"],
      [19000, "山梨県"],
      [20000, "長野県"],
      [21000, "岐阜県"],
      [22000, "静岡県"],
      [23000, "愛知県"],
      [24000, "三重県"],
      [25000, "滋賀県"],
      [26000, "京都府"],
      [27000, "大阪府"],
      [28000, "兵庫県"],
      [29000, "奈良県"],
      [30000, "和歌山県"],
      [31000, "鳥取県"],
      [32000, "島根県"],
      [33000, "岡山県"],
      [34000, "広島県"],
      [35000, "山口県"],
      [36000, "徳島県"],
      [37000, "香川県"],
      [38000, "愛媛県"],
      [39000, "高知県"],
      [40000, "福岡県"],
      [41000, "佐賀県"],
      [42000, "長崎県"],
      [43000, "熊本県"],
      [44000, "大分県"],
      [45000, "宮崎県"],
      [46000, "鹿児島県"],
      [47000, "沖縄県"],
    ],
  );
});
Deno.test("札幌市の全区を得る", async () => {
  assertEquals(
    getCityChildren(1100),
    [
      [1101, "中央区"],
      [1102, "北区"],
      [1103, "東区"],
      [1104, "白石区"],
      [1105, "豊平区"],
      [1106, "南区"],
      [1107, "西区"],
      [1108, "厚別区"],
      [1109, "手稲区"],
      [1110, "清田区"],
    ],
  );
});
Deno.test("北海道の全エリアを得る", async () => {
  assertEquals(
    getCityChildren(1000),
    [
      [1100, "札幌市"],
      [1202, "函館市"],
      [1203, "小樽市"],
      [1204, "旭川市"],
      [1205, "室蘭市"],
      [1206, "釧路市"],
      [1207, "帯広市"],
      [1208, "北見市"],
      [1209, "夕張市"],
      [1210, "岩見沢市"],
      [1211, "網走市"],
      [1212, "留萌市"],
      [1213, "苫小牧市"],
      [1214, "稚内市"],
      [1215, "美唄市"],
      [1216, "芦別市"],
      [1217, "江別市"],
      [1218, "赤平市"],
      [1219, "紋別市"],
      [1220, "士別市"],
      [1221, "名寄市"],
      [1222, "三笠市"],
      [1223, "根室市"],
      [1224, "千歳市"],
      [1225, "滝川市"],
      [1226, "砂川市"],
      [1227, "歌志内市"],
      [1228, "深川市"],
      [1229, "富良野市"],
      [1230, "登別市"],
      [1231, "恵庭市"],
      [1233, "伊達市"],
      [1234, "北広島市"],
      [1235, "石狩市"],
      [1236, "北斗市"],
      [1300, "石狩振興局"],
      [1330, "渡島総合振興局"],
      [1360, "檜山振興局"],
      [1390, "後志総合振興局"],
      [1420, "空知総合振興局"],
      [1450, "上川総合振興局"],
      [1480, "留萌振興局"],
      [1510, "宗谷総合振興局"],
      [1540, "オホーツク総合振興局"],
      [1570, "胆振総合振興局"],
      [1600, "日高振興局"],
      [1630, "十勝総合振興局"],
      [1660, "釧路総合振興局"],
      [1690, "根室振興局"],
    ],
  );
});
