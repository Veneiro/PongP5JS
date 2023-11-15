set :bpm, 135
set :beats, 4
set :sub_beat, 2
swing_ratio = 0.5

set :start_beats, true

chords_A =
  [(chord :F,  :major7)] * 2 + [(chord :G,  :dom7)] * 2 +
  [ (chord :G, :minor7) , (chord :Gb, :dom7) ]

set :chords, (
  chords_A + [ (chord :F, :major7) , (chord :Gb, :dom7) ] +
  chords_A + [ (chord :F, :major7) ] * 2 +
  
  [(chord :Gb, :major7)] * 2 + [(chord :B,  :dom7)] * 2 +
  [(chord :Fs, :minor7)] * 2 + [(chord :D5, :dom7)] * 2 +
  [(chord :G,  :minor7)] * 2 + [(chord :Eb5,:dom7)] * 2 +
  
  [ (chord :A,  :minor7), (chord :D, :dom7),
    (chord :G,  :minor7), (chord :C, :dom7) ] +
  
  chords_A + [ (chord :F, :major7) , (chord :Gb, :dom7) ]
).ring


# ---- instruments

# latin clave on 2 bars
define :keys_latin_2_bar_4 do | ch, br, am=2, sy=:beep |
  use_synth sy
  if br % 2 == 0 then
    play ch, amp: am, release: 0.2
    sleep 1
    play ch, amp: am, release: 0.2
    sleep 1.5
    play ch, amp: am, release: 0.2
    sleep 1
    play ch, amp: am, release: 0.2
  else
    sleep 0.5
    play ch, amp: am, release: 0.2
    sleep 1
    play ch, amp: am, release: 0.2
  end
end

# latin bass, 4 beats per bar
define :bass_latin_beat_4 do | ch, am=1, sy=:blade |
  use_synth sy
  use_octave -2
  play ch[0], release:0.2, amp: 2 * am
  sleep 1.5
  play ch[2], release:0.2, amp: am
  sleep 0.5
  play ch[2], release:0.2, amp: am
  sleep 1.5
  play ch[2], release:0.2, amp: am
  #sleep 0.5
end

# Define los golpes de la caja (snare) y bombo (kick) para un ritmo básico de jazz
snare_pattern = "--x--x----x--x-"
kick_pattern =  "x--xx--x-x-xx--"
# Define un patrón de charles (hi-hat)
# Este patrón de charles se usará para crear un ritmo estilo jazz
hihat_pattern = "x--x--x---x--x-"

# Reproduce el ritmo de la caja (snare)
define :play_bongo3 do
  sample "C:/Users/mateo/Downloads/sonicpi/drum-dry-hit-bongo-3_C_minor.wav", rate: 0.7, amp: [0.8, 1].choose
end

# Reproduce el bombo (kick)
define :play_bongo2 do
  sample "C:/Users/mateo/Downloads/sonicpi/drum-dry-hit-bongo-2_C_minor.wav", amp: [0.8, 1].choose
end

# Reproduce el charles (hi-hat)
define :play_bongo1 do
  sample "C:/Users/mateo/Downloads/sonicpi/drum-dry-hit-bongo_C_minor.wav",
    pan: rrand(-0.8, 0.8),
    rate: 1,
    amp: rrand(0.8, 1.0)
end

# hi hat on sub beat
define :drums_cymbals_sub_beat do | sb=16, am=1|
  snare_pattern.chars.each do |hit|
    if hit == "x"
      play_bongo3
    end
    sleep 1 * swing_ratio
  end
  #sleep 1/sb
end

# binary beat, 4 beats per bar
define :drums_binary_beat_4 do | am=1|
  kick_pattern.chars.each do |hit|
    if hit == "x"
      play_bongo2
    end
    sleep 1 * swing_ratio
  end
end

# binary beat, 4 beats per bar
define :drums_binary_beat_4 do | am=1|
  kick_pattern.chars.each do |hit|
    if hit == "x"
      play_bongo1
    end
    sleep 1 * swing_ratio
  end
end

# ---- live loops

use_bpm get(:bpm)

live_loop :keys do
  br, ch = (sync :bar)
  keys_latin_2_bar_4 ch, br
end

live_loop :bass do
  ch = (sync :bar)[1]
  bass_latin_beat_4 ch, 1.25
end

with_fx :reverb, mix: 0.5 do
  live_loop :cymbals do
    sync :beat
    drums_cymbals_sub_beat sb = get(:sub_beat), 0.5
  end
  
  live_loop :drums do
    sync :bar
    drums_binary_beat_4 0.1
  end
end

# ---- cues

cue :start