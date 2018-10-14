import React from "react";
import Capybara from "../../icons/Capybara";
import DogUgly from "../../icons/DogUgly";
import DogCute from "../../icons/DogCute";
import Hippo from "../../icons/Hippo";
import Monkey from "../../icons/Monkey";
import Penguin from "../../icons/Penguin";


const Avatar = ({ avatar, ...props }: Props) => {
  switch (avatar) {
    case 'dogCute':
      return <DogCute {...props} />;
    case 'dogUgly':
      return <DogUgly {...props} />;
    case 'hippo':
      return <Hippo {...props} />;
    case 'monkey':
      return <Monkey {...props} />;
    case 'penguin':
      return <Penguin {...props} />;
    case 'capybara':
    default: {
      return <Capybara {...props} />;
    }
  }
};

export default Avatar;
