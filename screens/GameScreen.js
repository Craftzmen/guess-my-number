import { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function generateRandomBetween(min, max, exclude) {
    const number = Math.floor(Math.random() * (max - min)) + min;

    if (number === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return number;
    }
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver])

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert(
                "Dont't lie",
                "You know that this is wrong...",
                [
                    { text: 'Sorry!', style: 'cancel' }
                ]
            )
            return;
        }
        if (direction === 'lower') {
            maxBoundry = currentGuess;
        } else {
            minBoundry = currentGuess + 1;
        }
        console.log(minBoundry, maxBoundry);
        const newNumber = generateRandomBetween(minBoundry, maxBoundry, currentGuess);
        setCurrentGuess(newNumber);
    }

    return (
        <View style={styles.screen} >
            <Title>Opponents Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText} >Higher or Lower?</InstructionText>
                <View style={styles.buttonsContainer} >
                    <View style={styles.buttonContainer} >
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')} >
                            <Ionicons name="remove-circle" size={32} color='white' />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer} >
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')} >
                            <Ionicons name="add-circle" size={32} color='white' />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View>
                {/* LOG ROUNDS */}
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 60,
        paddingHorizontal: 40,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    instructionText: {
        marginBottom: 20,
    }
})