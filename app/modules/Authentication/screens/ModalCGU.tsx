import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Modal, Portal, } from 'react-native-paper';
import { Colors } from '../../../constants';

interface ModalCGUProps {
    visible: boolean;
    hideModal: () => void;
}

export const ModalCGU = ({ visible, hideModal }: ModalCGUProps) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.txtTitle}>Conditions générales d'utilisation</Text>
                    <Text style={styles.txtSubTitle}>En vigueur au 23/04/2022</Text>

                    <Text style={styles.desciption}>Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des modalités de mise à disposition du site et des services par Kairos et de définir les conditions d’accès et d’utilisation des services par « l'Utilisateur ».
                        Les présentes CGU sont accessibles sur le site à la rubrique «CGU».</Text>
                    <Text style={styles.desciption}>Toute inscription ou utilisation du site implique l'acceptation sans aucune réserve ni restriction des présentes CGU par l’utilisateur. Lors de l'inscription sur le site via le Formulaire d’inscription, chaque utilisateur accepte expressément les présentes CGU en cochant la case précédant le texte suivant : « Je reconnais avoir lu et compris les CGU et je les accepte ».
                        En cas de non-acceptation des CGU stipulées dans le présent contrat, l'Utilisateur se doit de renoncer à l'accès des services proposés par le site.
                        RomaneApp se réserve le droit de modifier unilatéralement et à tout moment le contenu des présentes CGU.
                    </Text>
                    <Text style={styles.txtArticle}>Article 1 : Les mentions légales</Text>
                    <Text style={styles.descArticle}>L'édition du site RomaneApp est assurée par la Société SAS Kairos au capital de 100 euros, immatriculée au RCS de Chantepie sous le numéro 887948818, dont le siège social est situé au 11 placette jean sebastien bach
                        Numéro de téléphone 0674578668
                        Adresse e-mail : mhiguinen235@gmail.com.
                        Le Directeur de la publication est : Mathis Higuinen
                        L'hébergeur du site RomaneApp est la société Kairos , dont le siège social est situé au 11 placette jean sebastien bach , avec le numéro de téléphone : 0674578668.</Text>
                    <Text style={styles.txtArticle}>ARTICLE 2 : Accès au site</Text>
                    <Text style={styles.descArticle}>Le site RomaneApp permet à l'Utilisateur un accès gratuit aux services suivants : Le site internet propose les services suivants :
                        Apprentissage,
                        mémorisation,
                        chatRoom,
                        Partage,
                        Achate et vente de service.
                        Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.
                        L’Utilisateur non membre n'a pas accès aux services réservés. Pour cela, il doit s’inscrire en remplissant le formulaire. En acceptant de s’inscrire aux services réservés, l’Utilisateur membre s’engage à fournir des informations sincères et exactes concernant son état civil et ses coordonnées, notamment son adresse email.
                        Pour accéder aux services, l’Utilisateur doit ensuite s'identifier à l'aide de son identifiant et de son mot de passe qui lui seront communiqués après son inscription.
                        Tout Utilisateur membre régulièrement inscrit pourra également solliciter sa désinscription en se rendant à la page dédiée sur son espace personnel. Celle-ci sera effective dans un délai raisonnable. Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du site ou serveur et sous réserve de toute interruption ou modification en cas de maintenance, n'engage pas la responsabilité de RomaneApp. Dans ces cas, l’Utilisateur accepte ainsi ne pas tenir rigueur à l’éditeur de toute interruption ou suspension de service, même sans préavis.
                        L'Utilisateur a la possibilité de contacter le site par messagerie électronique à l’adresse email de l’éditeur communiqué à l’ARTICLE 1.</Text>
                    <Text style={styles.txtArticle}>ARTICLE 3 : Collecte des données</Text>
                    <Text style={styles.descArticle}>Le site est exempté de déclaration à la Commission Nationale Informatique et Libertés (CNIL) dans la mesure où il ne collecte aucune donnée concernant les Utilisateurs.
                    </Text>

                    <Text style={styles.txtArticle}>ARTICLE 4 : Propriété intellectuelle</Text>
                    <Text style={styles.descArticle}>
                        Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son...) font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
                        L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.
                        Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l’autorisation expresse de l’exploitant du site Internet constituerait une contrefaçon sanctionnée par l’article L 335-2 et suivants du Code de la propriété intellectuelle.
                        Il est rappelé conformément à l’article L122-5 du Code de propriété intellectuelle que l’Utilisateur qui reproduit, copie ou publie le contenu protégé doit citer l’auteur et sa source.
                    </Text>

                    <Text style={styles.txtArticle}>ARTICLE 5 : Responsabilité</Text>
                    <Text style={styles.descArticle}>Les sources des informations diffusées sur le site RomaneApp sont réputées fiables mais le site ne garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.
                        Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle. Malgré des mises à jour régulières, le site RomaneApp ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après la publication.
                        De même, le site ne peut être tenue responsable de l’utilisation et de l’interprétation de l’information contenue dans ce site.
                        L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation du mot de passe, quelle que soit sa forme, est interdite. Il assume les risques liés à l'utilisation de son identifiant et mot de passe. Le site décline toute responsabilité.
                        Le site RomaneApp ne peut être tenu pour responsable d’éventuels virus qui pourraient infecter l’ordinateur ou tout matériel informatique de l’Internaute, suite à une utilisation, à l’accès, ou au téléchargement provenant de ce site.
                        La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.
                    </Text>

                    <Text style={styles.txtArticle}>ARTICLE 6 : Liens hypertextes</Text>
                    <Text style={styles.descArticle}>Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en cliquant sur ces liens, il sortira du site RomaneApp. Ce dernier n’a pas de contrôle sur les pages web sur lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.
                    </Text>

                    <Text style={styles.txtArticle}>ARTICLE 7 : Cookies</Text>
                    <Text style={styles.descArticle}>L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement sur son logiciel de navigation.
                        Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l’ordinateur de l’Utilisateur par votre navigateur et qui sont nécessaires à l’utilisation du site RomaneApp. Les cookies ne contiennent pas d’information personnelle et ne peuvent pas être utilisés pour identifier quelqu’un. Un cookie contient un identifiant unique, généré aléatoirement et donc anonyme. Certains cookies expirent à la fin de la visite de l’Utilisateur, d’autres restent.
                        L’information contenue dans les cookies est utilisée pour améliorer le site RomaneApp.
                        En naviguant sur le site, L’Utilisateur les accepte.
                        L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son logiciel de navigation.
                    </Text>

                    <Text style={styles.txtArticle}>ARTICLE 8 : Publication par l’Utilisateur</Text>
                    <Text style={styles.descArticle}>
                        Le site permet aux membres de publier les contenus suivants :
                        Sujet, Matière, message, Chapitre, Carte de révision .
                        Dans ses publications, le membre s’engage à respecter les règles de la Netiquette (règles de bonne conduite de l’internet) et les règles de droit en vigueur.
                        Le site peut exercer une modération sur les publications et se réserve le droit de refuser leur mise en ligne, sans avoir à s’en justifier auprès du membre.
                        Le membre reste titulaire de l’intégralité de ses droits de propriété intellectuelle. Mais en publiant une publication sur le site, il cède à la société éditrice le droit non exclusif et gratuit de représenter, reproduire, adapter, modifier, diffuser et distribuer sa publication, directement ou par un tiers autorisé, dans le monde entier, sur tout support (numérique ou physique), pour la durée de la propriétéintellectuelle. Le Membre cède notamment le droit d'utiliser sa publication sur internet et sur les réseaux de téléphonie mobile.
                        La société éditrice s'engage à faire figurer le nom du membre à proximité de chaque utilisation de sa publication.
                        Tout contenu mis en ligne par l'Utilisateur est de sa seule responsabilité. L'Utilisateur s'engage à ne pas mettre en ligne de contenus pouvant porter atteinte aux intérêts de tierces personnes. Tout recours en justice engagé par un tiers lésé contre le site sera pris en charge par l'Utilisateur.
                        Le contenu de l'Utilisateur peut être à tout moment et pour n'importe quelle raison supprimé ou modifié par le site, sans préavis.
                    </Text>

                    <Text style={styles.txtArticle}>ARTICLE 9 : Droit applicable et juridiction compétente</Text>
                    <Text style={styles.descArticle}>La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.
                        Pour toute question relative à l’application des présentes CGU, vous pouvez joindre l’éditeur aux coordonnées inscrites à l’ARTICLE 1.
                    </Text>
                </ScrollView>
            </Modal>
        </Portal >
    );
};

const styles: any = StyleSheet.create({
    containerStyle:
    {
        flex: 1,
        backgroundColor: 'white',
        padding: 14,
        margin: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    txtTitle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.purple
    },
    txtSubTitle: {
        textAlign: "center",
        fontSize: 14,
        marginTop: 16
    },
    desciption: {
        marginTop: 16
    },
    txtArticle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 16,
        color: Colors.purple
    },
    descArticle: {
        marginTop: 16
    }

});