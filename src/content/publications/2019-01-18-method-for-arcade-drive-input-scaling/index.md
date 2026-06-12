---
slug: 2019-01-18-method-for-arcade-drive-input-scaling
title: Method for Arcade Drive input scaling
date: 2019-01-18
categories:
  - Programming
links:
  - label: Explainer document
    url: 'https://drive.google.com/file/d/1t2KKNmmWSEookzIs-kByMbm15zLqNR17/view'
  - label: Code example
    url: 'https://github.com/TripleHelixProgramming/DeepSpace/blob/master/src/main/java/frc/robot/commands/drivetrain/NormalizedArcadeDrive.java'
  - label: Chief Delphi discussion
    url: 'https://www.chiefdelphi.com/t/paper-arcade-input-scaling/341834'
thumbnail: ./Capture-1.png
---

"Arcade Drive" is a popular joystick control method for skid-steer robot drivetrains, where one joystick axis controls the "throttle" (speed forward and back) and the other axis controls the rate of rotation of the robot chassis.

We provide a method for scaling the [-2, 2] range of (throttle command + turn command) down to [-1, 1] for use with an arcade drive.

This scaling is applied smoothly with no discontinuities anywhere in the input range. There is also no loss of information-- both outputs (power/speed commands to motor controllers on the left and right sides of the drivetrain) always depend on both inputs (the driver’s throttle and turn joystick commands).
