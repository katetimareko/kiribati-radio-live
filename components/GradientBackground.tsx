import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet } from "react-native"
import PropTypes, { InferProps } from 'prop-types'

export default function GradientBackground({children} : InferProps<typeof GradientBackground.propTypes>) {
    return (
        <LinearGradient
        style={styles.container}
          colors={['#c31432', '#c31432', '#f5af19']}>
            {children}
        </LinearGradient>
    )
}

GradientBackground.propTypes = {
    children: PropTypes.element.isRequired
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
     // alignItems: 'center',
     // justifyContent: 'center',
    },
  });