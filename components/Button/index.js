import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../common/styles";

const Button = ({ onPress, title, advancedStyle, children }) => {
  const containerStyle = [styles.button, advancedStyle];
  const textStyle = [styles.text, advancedStyle];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      {title && <Text style={textStyle}>{title}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export default Button;
