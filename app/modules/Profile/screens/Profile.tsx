import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {layouts} from '../../../shared/styles';
import {FlatList} from 'react-native-gesture-handler';
import {Header, Section} from '../../../components/ui/layouts';

import {
  AdvancedButton,
  Badge,
  IconButton,
  TextArea,
} from '../../../components/ui';
import {useAuthContext} from '../../../contexts/auth.context';
import {AccountHeader} from './components';
import {typos} from '../../../shared/styles/typos';
import {lists} from '../../../shared/styles/lists';
import {ModalNames, RouteNames} from '../../../constants';
import {ToastService, UploadService} from '../../../shared/services';
import {BadgeDTO} from '../services/dto';
import {AccountHeaderEditable} from './components/AccountHeaderEditable';
import {generateColorFromPalette} from '../../../shared/utils';
import {ProfileApi} from '../services';
import {useRecoilProfile} from '../../../contexts/atoms';
import {useRecoilPacks} from '../../../contexts/atoms/packs';
import {TwoColumnPackList} from '../../../components/ui/elements/lists/TwoColumnPackList';
import {UserApi} from '../../Authentication/services/UserApi';

// Badges
const badges: BadgeDTO[] = [
  {id: '1', enabled: true, color: generateColorFromPalette()},
  {id: '2', enabled: true, color: generateColorFromPalette()},
  {id: '3', enabled: true, color: generateColorFromPalette()},
  {id: '4', enabled: false, color: generateColorFromPalette()},
  {id: '5', enabled: true, color: generateColorFromPalette()},
  {id: '6', enabled: false, color: generateColorFromPalette()},
];
const renderBadge = (item: BadgeDTO) => <Badge item={item} />;

export const Profile = ({navigation}: any) => {
  const {uid} = useAuthContext();
  const {profile, setProfile} = useRecoilProfile();
  const {packs} = useRecoilPacks();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableValues, setEditableValues] = useState<{
    displayName: string;
    bio?: string;
    avatarFileUri?: string;
  }>({
    displayName: profile.username || '',
    bio: profile.bio,
    avatarFileUri: profile.photoURL || '',
  });

  const handleChangeValues = (field: string, value: string) => {
    setEditableValues(curr => ({...curr, [field]: value}));
  };

  const handlePressSettings = () => {
    navigation.push(RouteNames.Settings);
  };

  const handlePressEdit = () => {
    setIsEditing(true);
  };

  const handlePressMoney = () => {
    navigation.push(RouteNames.Credits);
  };

  const handlePressSave = async () => {
    const {avatarFileUri, displayName, bio} = editableValues;
    let photoURL = undefined;
    if (avatarFileUri && avatarFileUri !== profile.photoURL) {
      try {
        photoURL = await UploadService.uploadToStorage(
          avatarFileUri,
          uid,
          'avatar.jpeg',
        );
      } catch (error) {
        console.error(error);
      }
      

    }

    let usernameValide = true
   
    if(displayName !== profile.username){
    const response = await UserApi.verifyUsername(displayName);
    usernameValide = response.isRight() && response.value.getValue() === true
    }
    
    
    if (usernameValide) {
      const result = await ProfileApi.updateProfile({
        bio,
        username: displayName,
        pictureUrl: photoURL,
      });
      if (result.isRight()) {
        const newProfile = result.value.getValue();
        setProfile(newProfile);
        ToastService.showToast('Profil mis à jour avec succès', 'success');
      } else {
        ToastService.showToast(result.value, 'error');
      }
      setIsEditing(false);
    } else {
      ToastService.showToast(
        'Username invalide',
        'error',
        "Votre nom d'utilisateur est déjà pris !",
      );
    }
  };

  const handlePressPack = async (packId: string) => {
    navigation.push(ModalNames.PackDetails, {id: packId});
  };

  const {bio} = profile;

  return (
    <View style={[layouts.container]}>
      <AdvancedButton
        icon={isEditing ? 'check' : 'edit'}
        onPress={isEditing ? handlePressSave : handlePressEdit}
      />
      <Header>
        {!isEditing && (
          <IconButton
            icon="settings"
            onPress={handlePressSettings}
            style={{position: 'absolute', zIndex: 99, top: 40, right: 20}}
          />
        )}
        {isEditing ? (
          <AccountHeaderEditable
            user={profile}
            onChangeValue={handleChangeValues}
          />
        ) : (
          <AccountHeader user={profile} onPressMoney={handlePressMoney} />
        )}
      </Header>
      <View style={layouts.content}>
        {/* <Section title="Mes badges">
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            contentContainerStyle={lists.horizontalScrollContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={badges}
            renderItem={({item}) => renderBadge(item)}
          />
        </Section> */}
        <Section title="Bio">
          {isEditing ? (
            <TextArea
              style={[typos.paragraph]}
              defaultValue={bio}
              onChangeText={(text: string) => handleChangeValues('bio', text)}
            />
          ) : (
            <Text style={[typos.paragraph]}>{bio}</Text>
          )}
        </Section>
        {/* <Section title="Mes packs en vente">
          <TwoColumnPackList
            style={styles.packs}
            packs={packs}
            onPressItem={handlePressPack}
          />
        </Section> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  packs: {
    paddingBottom: 300,
    minHeight: '100%',
  },
});
