import { View } from "react-native";
import { styles } from "../../common/styles";

const Navigation = ({
  children,
  advancedContainerStyle,
  advancedNavigationStyle,
}) => {
  return (
    <View style={[styles.navigationContainer, advancedContainerStyle]}>
      <View style={[styles.navigation, advancedNavigationStyle]}>
        {children}
      </View>
    </View>
  );
};

export default Navigation;
