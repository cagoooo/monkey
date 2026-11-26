/**
 * 玩法說明面板（寬螢幕時放在遊戲框左側）。
 */

import {BookOpen} from 'lucide-react';

const RULES: {icon: string; title: string; text: string}[] = [
  {icon: '🎯', title: '拉彈弓', text: '在自己那半邊按住拖曳，放開就丟出香蕉；拖越遠力量越大。'},
  {icon: '⏱️', title: '10 秒倒數', text: '每回合只有 10 秒，時間到還沒丟就算輸掉這一局。'},
  {icon: '🌬️', title: '風向與重力', text: '畫面下方顯示風向，旗子越長風越大，記得修正角度！'},
  {icon: '🎁', title: '撿寶物', text: '香蕉碰到空中的寶物，下一發就換成十倍大香蕉、硫酸瓶或火熱隕石。'},
  {icon: '🏆', title: '先贏 2 局', text: '打中對手的猩猩贏得一局，先拿下 2 局的人獲勝。'},
];

export function HowToPlay() {
  return (
    <div className="w-full bg-black/50 border-4 border-cyan-400 p-5 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
      <div className="flex items-center justify-center gap-3 mb-4">
        <BookOpen className="text-cyan-300" size={30} />
        <h3 className="text-3xl font-black text-white italic tracking-tighter">怎麼玩</h3>
      </div>

      <ul className="space-y-3">
        {RULES.map(r => (
          <li key={r.title} className="flex gap-3 bg-white/5 border-2 border-white/20 p-3">
            <span className="text-2xl leading-none shrink-0" aria-hidden="true">{r.icon}</span>
            <div className="min-w-0">
              <div className="text-lg font-bold text-yellow-300 leading-tight">{r.title}</div>
              <p className="text-base leading-relaxed opacity-90">{r.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 pt-4 border-t border-white/20 text-sm leading-relaxed opacity-70 text-center">
        啟發自 1991 年 QBASIC 經典遊戲
      </p>
    </div>
  );
}
