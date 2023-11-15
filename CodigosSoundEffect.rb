# Rebote Pala
play :C3, release: 0.1

# SpeedUP
use_synth :dull_bell
in_thread do
  play :C4, release: 0.2
  sleep 0.15
  play :E4, release: 0.2
  sleep 0.15
  play :AS4, release: 0.2
end

in_thread do
  play :G4, release: 0.2
  sleep 0.15
  play :B4, release: 0.2
  sleep 0.15
  play :F5, release: 0.2
end

# Game Over
use_synth :growl
play :C4, release: 0.5
sleep 0.3
play :B3, release: 0.5
sleep 0.3
play :F3, release: 0.5