
    async signOut() {
        await AsyncStorage.setItem('LOGGED', "false")
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Welcome' })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }