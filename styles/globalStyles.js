import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0D1B2A', // fundo azul escuro moderno
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1B263B',
    backgroundColor: '#0D1B2A',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 22,
    color: '#8B9DC3',
  },
  navLabel: {
    fontSize: 12,
    color: '#8B9DC3',
  },
  navLabelActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#1B263B',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  cardSubtitle: {
    color: '#8B9DC3',
    fontSize: 14,
    marginTop: 4,
  },
  buttonPrimary: {
    backgroundColor: '#2E8B57',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonSecondary: {
    backgroundColor: '#4169E1',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
