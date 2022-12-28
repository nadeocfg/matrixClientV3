import { Button, Link, Modal } from 'native-base';
import React, { useState } from 'react';
import theme from '../themes/theme';

interface TUModalProps {
  termsLink: string;
}

const TUModal = ({ termsLink }: TUModalProps) => {
  const [open, setOpen] = useState(false);

  if (termsLink) {
    return <Link href={termsLink}>Terms of Use and Privacy Policy</Link>;
  }

  return (
    <>
      <Button variant="link" size="sm" onPress={() => setOpen(true)}>
        Terms of Use and Privacy Policy
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Terms of Use</Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptates, quis aliquam? Inventore accusamus qui dolor minus eos
            consectetur aspernatur, expedita delectus vero rerum eligendi
            corporis itaque ab repudiandae nisi excepturi. Aliquam id expedita
            rem ea deserunt, tenetur laborum, harum temporibus saepe voluptatem
            omnis eos. Voluptate officiis provident iure delectus
            necessitatibus! Ad ullam natus, cupiditate tenetur quisquam
            obcaecati commodi provident hic? Reiciendis, quos deleniti nesciunt
            non totam quia in nihil molestias maiores. Mollitia explicabo,
            recusandae porro quos esse error quis exercitationem! Fugiat impedit
            dolores blanditiis ex eum laboriosam praesentium debitis vitae.
            Consectetur voluptate accusamus, repellat facilis reprehenderit
            autem nisi maiores? Dicta amet unde animi molestias alias eius odio
            voluptatum nihil ex ducimus numquam recusandae impedit, hic ipsum ea
            expedita. Cumque, voluptatibus. Perferendis qui ducimus est ut
            explicabo alias corporis nostrum in impedit? Eum repudiandae quaerat
            nihil distinctio sit quibusdam excepturi corporis rem dolores
            voluptas temporibus, maxime officia. Repellat laborum quasi
            temporibus!
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  setOpen(false);
                }}>
                Close
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default TUModal;
